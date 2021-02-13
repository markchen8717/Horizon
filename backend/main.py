import json

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Create

#Create a new session and return session uuid
@app.route('/sessions', methods=['POST'])
def newSession():
    pass

#Create a new user for a given session
@app.route('/sessions/:sessionID/users', methods=['POST'])
def newUser():
    pass

#Create a response for a given user for a given session
@app.route('/sessions/:sessionID/users/userID/responses', methods=['PUT'])#PUT is idempotent, POST is not
def newResponse():
    pass

#Read

#Get an ordered list of questions for a given session
@app.route('/sessions/:id/questions', methods=['GET'])
def index():
    pass

   

if __name__ == '__main__':
    app.run(debug=True)
