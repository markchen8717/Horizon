import json
import uuid
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from Session import Session
from User import User
from Group import Group

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
    -responses to questions

Group
    - uuid
    - user list
'''

sessions = {}
users = {}
groups = {}


'''Create'''

# Create a new session and return session uuid


@app.route('/sessions', methods=['POST'])
def addSession():
    try:
        sessionUUID = uuid.uuid1()
        sessionQuestions = None  # Generate a list of questions
        sessions[sessionUUID] = Session(sessionUUID, questions)
        return jsonify({uuid: sessionUUID})
    except:
        return make_response(None, 500)

# Create a new user for a given session


@app.route('/sessions/<sessionID>/users', methods=['POST'])
def addUser(sessionID):
    try:
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        userUUID = uuid.uuid1()
        newUser = User(userUUID)
        sessions[sessionID].addUser(newUser)
        users[userUUID] = newUser
        return jsonify({uuid: userUUID})
    except:
        return make_response(None, 500)


'''Read'''

# Get an ordered list of questions for a given session


@app.route('/sessions/<sessionID>/questions', methods=['GET'])
def getSessionQuestions(sessionID):
    try:
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        return jsonify(sessions[sessionID].questions)
    except:
        return make_response(None, 500)

# Get info about a group


@app.route('/groups/<groupID>', methods=['GET'])
def getGroup(groupID):
    try:
        if groupID not in groups:
            return make_response('group {id} does not exists'.format(id=groupID), 404)
        return jsonify(groups[groupID].__dict__)
    except:
        return make_response(None, 500)

# Get info about a user


@app.route('/users/<userID>', methods=['GET'])
def getUser(userID):
    try:
        if userID not in users:
            return make_response('user {id} does not exists'.format(id=userID), 404)
        return jsonify(users[userID].__dict__)
    except:
        return make_response(None, 500)


'''Update'''

# Update a user

@app.route('/users/<userID>', methods=['PATCH'])
def updateUser(userID):
    try:
        if userID not in users:
            return make_response('user {id} does not exists'.format(id=userID), 404)
        data = request.json
        if "responses" in data:
            users[userID].setResponses(data["responses"])
        return jsonify(users[userID].__dict__)
    except:
        return make_response(None, 500)


if __name__ == '__main__':
    app.run(debug=True)
