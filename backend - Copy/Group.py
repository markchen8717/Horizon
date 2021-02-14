class Group:
    def __init__(self,uuid):
        self.uuid = uuid
        self.users = {}
    
    def addUser(self, user):
        if user.uuid not in self.users:
            self.users[user.uuid] = user
            user.group = self.uuid

    def getSerializable(self):
        return {"uuid":self.uuid, "users":[ user.username for userUUID,user in self.users.items()] }