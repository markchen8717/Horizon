import numpy as np
import tensorflow as tf

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Flatten, Dense


EPOCHS = 10

def get_model():
    model = Sequential()
    model.add(Flatten())
    model.add(Dense(128, activation='relu', kernel_initializer='he_uniform'))
    model.add(Dense(32, activation='relu', kernel_initializer='he_uniform'))
    model.add(Dense(8, activation='relu', kernel_initializer='he_uniform'))
    model.add(Dense(1, activation='sigmoid'))
    return model

def main():
    loaded = np.load('data.npz')
    X, Y = loaded['X'], loaded['Y']
    print(f'\n\nLoaded X with shape: {X.shape}, and Y with shape {Y.shape}\n\n')

    model = get_model()
    model.build(input_shape=(None, *X.shape[1:]))
    model.compile(
        optimizer='SGD',
        loss='binary_crossentropy',
        metrics=['accuracy'])
    print(model.summary())

    model.fit(X, Y, epochs=EPOCHS)


if __name__ == '__main__':
    main()
