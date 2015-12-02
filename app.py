from flask import Flask, jsonify, render_template, send_from_directory
from decimal import *
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
    cnx = awsdb.connect();
    result = awsdb.query(cnx, "SELECT * FROM pollution_table");
    awsdb.close(cnx);
    response = json.dumps(result, default=json_date_handler)
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
    result = awsdb.query(cnx, "SELECT * FROM traffic_london");
    awsdb.close(cnx);
    response = json.dumps(result, default=json_date_handler)
    return response

@app.route("/req/api/property_listings/<lat>/<longi>", methods=['GET'])
def get_property_listings_with_params(lat, longi):
    listings = cache.get('listings')
    print "Requesting property listings from Zoopla for lat: " + lat + ", lon: " + longi
    params = [
    'area=London',
    'latitude=' + lat,
    'longitude=' + longi,
    'api_key=nkqx8hj64jsugpzuzcukb9tw',
    'page_size=50',
    'summarised=true'
    ]
    param_string = "&".join(params)
    listings = json.loads(urllib2.urlopen("http://api.zoopla.co.uk/api/v1/property_listings.json?" + param_string).read())['listing']
    #indent/separators are for debugging/prettyprinting purposes
    return json.dumps(listings, indent=4, separators=(',', ': '))

@app.route("/req/api/property_listings", methods=['GET'])
def get_property_listings():
    print "Trying listings from cache"
    listings = cache.get('listings')
    if listings is None:
        print "Not cached: requesting property listings from Zoopla"
        params = [
        'area=London',
        'api_key=nkqx8hj64jsugpzuzcukb9tw',
        'page_size=100',
        'summarised=true'
        ]
        param_string = "&".join(params)
        listings = json.loads(urllib2.urlopen("http://api.zoopla.co.uk/api/v1/property_listings.json?" + param_string).read())['listing']
        # Timeout is in seconds, set timeout for 30 minutes
        cache.set('listings', listings, timeout= 60*30)
    #indent/separators are for debugging/prettyprinting purposes
    return json.dumps(listings, indent=4, separators=(',', ': '))


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
