from flask import Flask, jsonify
import json
import awsdb
from datetime import date, datetime
app = Flask(__name__)

@app.route("/")
def hello():
    return "Clean air Team!"

def json_date_handler(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, date) or isinstance(obj, datetime):
        serial = obj.isoformat()
        return serial
    else:
        raise TypeError ("Type not serializable")

@app.route("/req/db/pollution_data", methods=['GET'])
def get_pollution_data():
    print "Requesting data"
    cnx = awsdb.connect();
    result = awsdb.query(cnx, "SELECT * FROM pollution_table");
    awsdb.close(cnx);
    response = json.dumps(result, default=json_date_handler)
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0')
