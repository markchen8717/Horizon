import random
from random import choice

import numpy as np
import pandas as pd
import tensorflow as tf
from User import User
from Group import Group
from Session import Session
import uuid


data = pd.read_csv('questions.csv', header=None, names=[
                   'Question', 'Option1', 'Option2', 'Type', 'Img1', 'Img2'])
model = tf.keras.models.load_model('model')

# Return a list of random questions


def getQuestions(n=10):
    return [{
            'id': idx,
            'type': row['Type'],
            'question': row['Question'],
            'a1': row['Option1'],
            'a2': row['Option2'],
            'Img1': row['Img1'],
            'Img2': row['Img2']
            } for idx, row in data.sample(n=n).iterrows()]


def getGroups(users, questions):
    if not users:
        return
    res = []
    qs = np.array([question['id'] for question in questions])
    X = np.zeros((2, 100))
    simmatrix = np.zeros((len(users), len(users)))
    idx2usr = {idx: user for idx, user in enumerate(users)}
    for ia in idx2usr:
        for ib in idx2usr:
            if ia != ib:
                aans = np.array(idx2usr[ia].responses)
                bans = np.array(idx2usr[ib].responses)

                X[0][qs] = aans
                X[1][qs] = bans

                simm = model.predict(np.swapaxes(X, 0, 1).reshape((1, 100, 2)))

                simmatrix[ia][ib] = simm
                simmatrix[ib][ia] = simm

    while idx2usr:
        g = Group(str(uuid.uuid1()))
        uidx = choice([*idx2usr.keys()])
        print(uidx, uidx in idx2usr)
        g.addUser(idx2usr.pop(uidx))
        if len(idx2usr) <= 2:
            while idx2usr:
                uidx = choice([*idx2usr.keys()])
                g.addUser(idx2usr.pop(uidx))
        else:
            bestuidx = max(idx2usr, key=lambda idx: simmatrix[uidx][idx])
            g.addUser(idx2usr.pop(bestuidx))
        res.append(g)
    return res


def testGetGroups():
    qs = getQuestions()
    sessions = {"1": Session("1", qs)}
    users = {"2": User("2", "Sam"), "4": User("4", "Mark"), "6": User("6", "LUL"), "8": User("8", "Trihard 7")}
    for user in users:
       users[user].setResponses([random.randint(-1, 1) for _ in range(len(qs))])
    groups = getGroups([*users.values()], qs)
    print(groups) #omegallu sednit 


if __name__ == '__main__':
    testGetGroups()
