class Session:
    def __init__(self, uuid, questions):
        self.uuid = uuid
        self.users = {}
        self.questions = questions

    def addUser(self, user):
        if user.uuid not in self.users:
            self.users[user.uuid] = user
    
