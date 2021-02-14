import enum


class Session:
    def __init__(self, uuid, questions):
        self.uuid = uuid
        self.users = {}
        self.questions = questions
        self.status = "ACTIVE"

    def addUser(self, user):
        if user.uuid not in self.users:
            self.users[user.uuid] = user

    def setStatus(self, status):
        self.status = status

    def getSerializable(self):
        return{
            "uuid": self.uuid,
            "users": [user.username for userUUID, user in self.users.items()],
            "questions": self.questions,
            "status": self.status
        }
