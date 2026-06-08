from flask import Flask, jsonify, request
from flask_cors import CORS

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/getInitialDataForMapGraph', methods=['GET', 'POST'])
def getInitialDataForGraphs():
    if request.method == 'POST':
      post_data = request.get_json()
      print(post_data) 
      return jsonify('5')

if __name__ == '__main__':
    app.run(debug=True)