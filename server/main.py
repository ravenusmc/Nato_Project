from flask import Flask, jsonify, request
from flask_cors import CORS

# Importing libraries that I made 
from data import *

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/getInitialDataForMapGraph', methods=['GET', 'POST'])
def getInitialDataForGraphs():
    if request.method == 'POST':
      get_data_object = BuildData()
      post_data = request.get_json()
      year = post_data['year']
      NATO_states_data = get_data_object.get_data_for_year(year)
      print(NATO_states_data)
      return jsonify(NATO_states_data)

def getDataForHistoryGraphs():
  if request.method == 'POST':
    get_data_object = BuildData()
    post_data = request.get_json()
    NATO_STATES_JOIN_YEAR = get_data_object.get_NATO_join_by_decade()


   


if __name__ == '__main__':
    app.run(debug=True)