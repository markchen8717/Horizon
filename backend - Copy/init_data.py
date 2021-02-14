import numpy as np

TOTALQS = 100
QASKED = 20


def build_dummy_data(samples=100_000):
    assert samples % 2 == 0
    X = np.zeros((samples, 2, TOTALQS))
    Y = np.zeros((samples, 1))
    ans = [-1, 1]  # -1 => No, 1 => Yes
    allqs = np.arange(TOTALQS)

    for i in range(samples // 2):
        np.random.shuffle(allqs)
        qs = allqs[:QASKED]

        ap, bp = np.random.rand(2)

        aans = np.random.choice(ans, QASKED, p=[1 - ap, ap])
        bans = np.random.choice(ans, QASKED, p=[1 - bp, bp])

        reqeq = np.random.randint(QASKED // 4, QASKED - QASKED // 4)

        gotalong = 1 if (aans == bans).sum() >= reqeq else 0

        X[2 * i][0][qs] = aans
        X[2 * i][1][qs] = bans
        Y[2 * i] = gotalong

        X[2 * i + 1][0][qs] = bans
        X[2 * i + 1][1][qs] = aans
        Y[2 * i + 1] = gotalong
    return np.swapaxes(X, 1, 2), Y


def main():
    X, Y = build_dummy_data()
    np.savez_compressed('data.npz', X=X, Y=Y)


if __name__ == '__main__':
    main()
