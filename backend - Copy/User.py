class User:
    def __init__(self, uuid, username):
        self.uuid = uuid
        self.group = None
        self.responses = None
        self.username = username
    
    def setResponses(self,responses):
        self.responses = responses