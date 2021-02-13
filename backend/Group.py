class Group:
    def __init__(self,uuid):
        self.uuid = uuid
        self.users = {}
    
    def addUser(self, user):
        if user.uuid not in self.users:
            self.users[user.uuid] = user