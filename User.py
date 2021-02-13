class User:
    def __init__(self, uuid):
        self.uuid = uuid
        self.group = None
        self.responses = None
    
    def setResponses(self,responses):
        self.responses = responses