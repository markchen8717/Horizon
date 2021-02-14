import json
import uuid
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from Session import Session
from User import User
from Group import Group
# from data import getQuestions

def getQuestions():
    return None

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

sessionCount = 0
sessions = {"1": Session("1", None)}

# Dummy data
users = {"2": User("2", "Sam"), "4": User("4", "Mark")}
groups = {"3": Group("3")}
sessions["1"].addUser(users["2"])
sessions["1"].addUser(users["4"])
groups["3"].addUser(users["4"])
groups["3"].addUser(users["2"])
print(sessions["1"].getSerializable())


@app.route('/', methods=['GET'])
def index():
    return "hello world"


'''Create'''

# Create a new session and return session uuid


@app.route('/sessions', methods=['POST'])
def addSession():
    try:
        global sessionCount
        # sessionUUID = str(uuid.uuid1())
        sessionUUID = sessionCount + 1
        sessionCount += 1
        sessionQuestions = getQuestions()
        sessions[sessionUUID] = Session(sessionUUID, sessionQuestions)
        print(sessions[sessionUUID])
        return jsonify({"uuid": sessionUUID})
    except:
        return make_response(None, 500)

# Create a new user for a given session


@app.route('/sessions/<sessionID>/users', methods=['POST'])
def addUser(sessionID):
    try:
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        data = request.json
        userUUID = str(uuid.uuid1())
        newUser = User(userUUID, data["username"])
        sessions[sessionID].addUser(newUser)
        users[userUUID] = newUser
        return jsonify({"uuid": userUUID})
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
        return jsonify(groups[groupID].getSerializable())
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

# Update the status of a session

@app.route('/sessions/<sessionID>', methods=['PATCH'])
def updateSession(sessionID):
    try:
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        data = request.json
        #only allow setting status to stopped
        if "status" in data:
            if data["status"] != "STOPPED":
                return make_response('invalid status argument',404)
            sessions[sessionID].setStatus("STOPPED")
        #Arrange groups for users
        return jsonify(sessions[sessionID].getSerializable())
    except:
        return make_response(None,500)

if __name__ == '__main__':
    app.run(debug=True)
