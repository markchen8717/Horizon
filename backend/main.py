import json

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

'''
Session
    - uuid
    - questions
    - users

User
    - uuid
    - uuid of the group they belong to

Group
    - uuid
    - user list
'''

#Create

#Create a new session and return session uuid
@app.route('/sessions', methods=['POST'])
def addSession():
    pass

#Create a new user for a given session
@app.route('/sessions/:sessionID/users', methods=['POST'])
def addUser():
    pass

#Create a response for a given user for a given session
@app.route('/sessions/:sessionID/users/userID/responses', methods=['POST'])
def createResponse():
    pass

#Read

#Get an ordered list of questions for a given session
@app.route('/sessions/:id/questions', methods=['GET'])
def getSessionQuestions():
    pass

#Get info about a group
@app.route('/groups/:id', methods=['GET'])
def getGroup():
    pass

#Get info about a user
@app.route('/users/:id', methods=['GET'])
def getUser():
    pass

#Update

#Update a user
@app.route('/users/:id',methods=['PUT'])
def updateUser():
    pass
   

if __name__ == '__main__':
    app.run(debug=True)
