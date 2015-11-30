from flask import Flask, jsonify, render_template, send_from_directory
from decimal import *
import json
import awsdb
from datetime import date, datetime
app = Flask(__name__, template_folder='frontend',)

@app.route("/")
def hello():
    return render_template('index.html')
    # return render_template('./../frontend/index.html')

@app.route("/dist/bundle.js")
def react_app():    
    return open('./frontend/dist/bundle.js').read()

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

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
