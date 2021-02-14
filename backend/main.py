import json
import os
os.environ['CUDA_VISIBLE_DEVICES'] = '0'
# import uuid
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from Session import Session
from User import User
from Group import Group
from data import getQuestions
from data import getGroups
import uuid

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

@app.route('/', methods=['GET'])
def index():
    return "hello world"


'''Create'''

# Create a new session and return session uuid
# class Counter:
#     def __init__(self,start):
#         self.count = start
#     def increment(self):
#         self.count +=1

# sessionCount = Counter(0)

sessions={}
users={}
groups={}


@app.route('/sessions', methods=['POST'])
def addSession():
    try:
        global sessions
        global users
        global groups
        sessionUUID = str(uuid.uuid1())
        # sessionUUID = str(sessionCount)
        # sessionCount.increment()
        # sessionCount += 1
        sessionQuestions = getQuestions()
        sessions[sessionUUID] = Session(sessionUUID, sessionQuestions)
        print("Created session {id}".format(id=sessionUUID))
        print("All sessions",sessions)
        return jsonify({"uuid": sessionUUID})
    except:
        return make_response(None, 500)

# Create a new user for a given session


@app.route('/sessions/<sessionID>/users', methods=['POST'])
def addUser(sessionID):
    try:
        global sessions
        global users
        global groups
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        data = request.json
        if "username" not in data:
            return make_response('missing username param',404)
        userUUID = str(uuid.uuid1())
        newUser = User(userUUID, data["username"])
        print("Created user {id}".format(id=userUUID))
        sessions[sessionID].addUser(newUser)
        users[userUUID] = newUser
        print("All users",users)
        return jsonify({"uuid": userUUID})
    except:
        return make_response(None, 500)


'''Read'''

# Get an ordered list of questions for a given session


@app.route('/sessions/<sessionID>/questions', methods=['GET'])
def getSessionQuestions(sessionID):
    try:
        global sessions
        global users
        global groups
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        return jsonify(sessions[sessionID].questions)
    except:
        return make_response(None, 500)

# Get info about a group


@app.route('/groups/<groupID>', methods=['GET'])
def getGroup(groupID):
    try:
        global sessions
        global users
        global groups
        if groupID not in groups:
            return make_response('group {id} does not exists'.format(id=groupID), 404)
        return jsonify(groups[groupID].getSerializable())
    except:
        return make_response(None, 500)

# Get info about a user


@app.route('/users/<userID>', methods=['GET'])
def getUser(userID):
    try:
        global sessions
        global users
        global groups
        print("All users",users)
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
        global sessions
        global users
        global groups
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
        global sessions
        global users
        global groups
        print("All sessions",sessions)
        if sessionID not in sessions:
            return make_response('session {id} does not exists'.format(id=sessionID), 404)
        data = request.json
        #only allow setting status to stopped
        if "status" in data:
            if data["status"] != "STOPPED":
                return make_response('invalid status argument',404)
            sessions[sessionID].setStatus("STOPPED")
            groupList = getGroups([*sessions[sessionID].users.values()],sessions[sessionID].questions)
            for group in groupList:
                groups[group.uuid] = group
        #Arrange groups for users
        return jsonify(sessions[sessionID].getSerializable())
    except:
        return make_response(None,500)

if __name__ == '__main__':
    app.run(threaded=False, processes=1, debug=True)
