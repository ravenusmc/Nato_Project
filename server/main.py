from flask import Flask, jsonify, request
from flask_cors import CORS

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

#This will get the initial data for the graphs that need it. 
@app.route('/getInitialDataForGraphs', methods=['GET'])
def getInitialDataForGraphs():
    if request.method == 'GET':
      return jsonify(data_dictionary)

if __name__ == '__main__':
    app.run(debug=True)