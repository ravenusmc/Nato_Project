from flask import Flask, jsonify, request
from flask_cors import CORS

# Importing libraries that I made 
from data import *

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/getInitialDataforGraphs', methods=['GET', 'POST'])
def getInitialDataforGraphs():
   if request.method == 'POST': 
    get_data_object = BuildData()
    state_GDP_Data = get_data_object.country_GDP_By_Year('Belgium')
    return jsonify(state_GDP_Data)
     

@app.route('/getInitialDataForMapGraph', methods=['GET', 'POST'])
def getInitialDataForGraphs():
    if request.method == 'POST':
      get_data_object = BuildData()
      post_data = request.get_json()
      year = post_data['year']
      NATO_states_data = get_data_object.get_data_for_year(year)
      print(NATO_states_data)
      return jsonify(NATO_states_data)


@app.route('/getDataForStateAndEconomyGraph', methods=['GET', 'POST'])
def getDataForStateAndEconomyGraph():
   if request.method == 'POST': 
    get_data_object = BuildData()
    post_data = request.get_json()
    state = post_data['state']
    state_GDP_Data = get_data_object.country_GDP_By_Year(state)
    return jsonify(state_GDP_Data)
   


if __name__ == '__main__':
    app.run(debug=True)