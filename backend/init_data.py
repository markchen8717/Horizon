import numpy as np


TOTALQS = 100
QASKED = 10


def build_dummy_data(samples=100_000):
    assert samples % 2 == 0
    res = np.zeros((samples, 2 * TOTALQS + 1))
    ans = [-1, 1]  # -1 => No, 1 => Yes
    allqs = np.arange(TOTALQS)

    for i in range(samples // 2):
        np.random.shuffle(allqs)
        qs = allqs[:QASKED]

        ap, bp = np.random.rand(2)

        aans = np.random.choice(ans, QASKED, p=[1 - ap, ap])
        bans = np.random.choice(ans, QASKED, p=[1 - bp, bp])

        reqeq = np.random.randint(QASKED // 3, QASKED - QASKED // 10)

        gotalong = 1 if (aans == bans).sum() >= reqeq else 0

        res[2 * i][qs] = aans
        res[2 * i][qs + TOTALQS] = bans
        res[2 * i][-1] = gotalong

        res[2 * i + 1][qs] = bans
        res[2 * i + 1][qs + TOTALQS] = aans
        res[2 * i + 1][-1] = gotalong
    return res


def main():
    data = build_dummy_data()
    np.savez_compressed('data.npz', data)


if __name__ == '__main__':
    main()
