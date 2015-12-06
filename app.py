from flask import Flask, jsonify, render_template, send_from_directory
from decimal import *
import requests
import time
import json
import urllib2
import awsdb
from werkzeug.contrib.cache import SimpleCache
from datetime import date, datetime
app = Flask(__name__, template_folder='frontend',)

cache = SimpleCache()

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/assets/<path:path>")
def assets(path):
  return send_from_directory('./frontend/assets', path)

def json_date_handler(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, date) or isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    else:
        raise TypeError ("Type not serializable")

@app.route("/req/db/pollution_data", methods=['GET'])
def get_pollution_data():
    print "Requesting pollution data"
    pollution_data = cache.get('pollution_data')
    if pollution_data is None:
        cnx = awsdb.connect();
        result = awsdb.query(cnx, "SELECT * FROM pollution_table");
        base_link = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        key = 'AIzaSyBbdn_tU8e6j06yjKK8_mAXqlZoTwQH08w'
        count = 0

        # for r in result:
        #     if r.get('lat') == None or r.get('long') == None:
        #         if count == 5:
        #             time.sleep(1)
        #             count = 0
        #         link = base_link + r['location'] + '&key=' + key
        #         gmaps_result = requests.get(link).json()
        #         print gmaps_result
        #         lat = gmaps_result['results'][0]['geometry']['location']['lat']
        #         longi = gmaps_result['results'][0]['geometry']['location']['lng']
        #         awsdb.mutate(cnx, "UPDATE pollution_table pt SET pt.lat = %s, pt.long = %s WHERE pt.id=%s;", param=[lat, longi, r.get('id')])
        #         r['lat'] = lat
        #         r['long'] = longi
        #         count += 1

        awsdb.close(cnx);
        response = json.dumps(result, default=json_date_handler)
        cache.set('pollution_data', response, timeout= 60*60*24)
    else:
        response = pollution_data

    return response

@app.route("/req/db/traffic_data/<lat>/<longi>", methods=['GET'])
def get_traffic_data_with_param(lat, longi):
    print "Requesting traffic data"
    print lat, longi
    lat_decimal = Decimal(repr(float(longi))).as_tuple().exponent
    long_decimal = Decimal(repr(float(lat))).as_tuple().exponent
    param2 = float(lat) + (10 ** int(lat_decimal))
    params = []
    if float(lat) < 0:
        param2 = float(lat) - (10 ** int(lat_decimal))
        params.append(param2)
        params.append(float(lat))
    else:
        params.append(float(lat))
        params.append(param2)
    param4 = float(longi) + (10 ** int(long_decimal))
    if float(longi) < 0:
        param4 = float(longi) - (10 ** int(long_decimal))
        params.append(param4)
        params.append(float(longi))
    else:
        params.append(float(longi))
        params.append(param4)
    cnx = awsdb.connect();
    result = awsdb.query(cnx, "SELECT * FROM traffic_london WHERE Latitude > %s AND Latitude < %s AND Longitude > %s AND Longitude < %s", params);
    awsdb.close(cnx);
    response = json.dumps(result, default=json_date_handler)
    return response

@app.route("/req/db/traffic_data", methods=['GET'])
def get_traffic_data():
    print "Requesting pollution data"
    cnx = awsdb.connect();
    result = awsdb.query(cnx, "SELECT Longitude, Latitude, CAST(1 * SUM(AllMotorVehicles) / count(*) as Decimal(10,6)) as idx FROM traffic_london GROUP BY Longitude, Latitude;");
    for r in result:
        r['idx'] = float(r['idx'])
    print result
    awsdb.close(cnx);
    response = json.dumps(result, default=json_date_handler)
    return response

def getZooplaListings(param_string):
    t = json.loads(urllib2.urlopen("http://api.zoopla.co.uk/api/v1/property_listings.json?" + param_string).read())['listing']
    for i in range(2, 5):
        t += json.loads(urllib2.urlopen("http://api.zoopla.co.uk/api/v1/property_listings.json?page_number=" + str(i) + "&" + param_string).read())['listing']
    return t
def filterListingAttributes(obj):
    return {
        'agent_logo': obj['agent_logo'],
        'latitude': obj['latitude'],
        'longitude': obj['longitude'],
        'displayable_address': obj['displayable_address'],
        'thumbnail_url': obj['thumbnail_url'],
        'description': obj['description'],
        'details_url': obj['details_url'],
        'status': obj['status'],
        'property_type': obj['property_type'],
        'price': obj['price'],
        'num_bedrooms': obj['num_bedrooms']
     }

@app.route("/req/api/property_listings", methods=['GET'])
def get_property_listings():
    print "Trying listings from cache"
    listings = cache.get('listings')
    if listings is None:
        print "Not cached: requesting property listings from Zoopla"
        params = ['area=London','api_key=nkqx8hj64jsugpzuzcukb9tw','page_size=100','summarised=true']
        param_string = "&".join(params)
        raw_listings = getZooplaListings(param_string)
        listings = map(filterListingAttributes, raw_listings)
        # Timeout is in seconds, set timeout for 24 hours
        cache.set('listings', listings, timeout= 60*60*24)
    #indent/separators are for debugging/prettyprinting purposes
    return json.dumps(listings, indent=4, separators=(',', ': '))


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
