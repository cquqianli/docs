import numba as nb
import numpy as np

@nb.njit
def func(size: int):
    ary = np.array([np.arange(size),np.arange(size)+1,np.arange(size)-1]).T
    X = np.array([ary[1:,0] - ary[:-1,2],
                  ary[1:,1] - ary[:-1,2],
                  ary[1:,0] - ary[1:,1]
                  ])
    return X

testVar: list

if __name__ == "__main__":
    with open("a", "r") as f:
        size = int(f.readline())
        Y = func(size)
        testVar = [Y for i in range(size)]
