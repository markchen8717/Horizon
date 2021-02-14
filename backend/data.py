import numpy as np
import pandas as pd
import tensorflow as tf


data = pd.read_csv('questions.csv', header=None, names=['Question', 'Option1', 'Option2', 'Type', 'Img1', 'Img2'])
model = tf.keras.models.load_model('model')

#Return a list of random questions
def getQuestions(n=10):
    return [{
            'type': row['Type'],
            'question': row['Question'],
            'a1': row['Option1'],
            'a2': row['Option2'],
            'Img1': row['Img1'],
            'Img2': row['Img2']
        } for _, row in data.sample(n=n).iterrows()]


def getGroups(users, gsize=3):
    simmatrix = np.zeros((len(users), len(users)))
    pass
    

if __name__ == '__main__':
    main()
