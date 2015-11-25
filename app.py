from flask import Flask, jsonify, render_template
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
    app.run(debug=True,host='0.0.0.0')
