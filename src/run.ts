import { Defender, getRandomInt } from './defender'

const NUM_RUNS = 25e3
const DEBUG = false
const runs = []

const run = async () => {
  const defender = new Defender()

  const hitSubroutine = async (coord: {
    x: number
    y: number
  }): Promise<void> => {
    if (defender.board.allSunk()) return
    const { x, y } = coord

    // left
    if (defender.board.canGuess({ x: x - 1, y })) {
      defender.board.doGuess({ x: x - 1, y })
      if (DEBUG) await defender.board.print()
      if (defender.board.isHit({ x: x - 1, y }))
        await hitSubroutine({ x: x - 1, y })
    }
    if (defender.board.allSunk()) return

    // up
    if (defender.board.canGuess({ x, y: y - 1 })) {
      defender.board.doGuess({ x, y: y - 1 })
      if (DEBUG) await defender.board.print()
      if (defender.board.isHit({ x, y: y - 1 }))
        await hitSubroutine({ x, y: y - 1 })
    }
    if (defender.board.allSunk()) return

    // right
    if (defender.board.canGuess({ x: x + 1, y })) {
      defender.board.doGuess({ x: x + 1, y })
      if (DEBUG) await defender.board.print()
      if (defender.board.isHit({ x: x + 1, y }))
        await hitSubroutine({ x: x + 1, y })
    }
    if (defender.board.allSunk()) return

    // down
    if (defender.board.canGuess({ x, y: y + 1 })) {
      defender.board.doGuess({ x, y: y + 1 })
      if (DEBUG) await defender.board.print()
      if (defender.board.isHit({ x, y: y + 1 }))
        await hitSubroutine({ x, y: y + 1 })
    }
  }

  // checkerboard pattern
  // for (let y = 0; y < 10; y++) {
  //   // y
  //   for (let j = 0; j < 5; j++) {
  //     // x
  //     const x = j * 2 + (y % 2)
  //     if (defender.board.canGuess({ x, y })) {
  //       defender.board.doGuess({ x, y })
  //       if (DEBUG) await defender.board.print()
  //       if (defender.board.isHit({ x, y })) await hitSubroutine({ x, y })
  //     }
  //     if (defender.board.allSunk()) break
  //   }
  //   if (defender.board.allSunk()) break
  // }

  // modified checkerboard pattern
  // for (let i = 0; i < 5; i++) {
  //   // y
  //   const y = i * 2
  //   for (let j = 0; j < 5; j++) {
  //     // x
  //     const x = j * 2 + (y % 2)
  //     if (defender.board.canGuess({ x, y })) {
  //       defender.board.doGuess({ x, y })
  //       if (DEBUG) await defender.board.print()
  //       if (defender.board.isHit({ x, y })) await hitSubroutine({ x, y })
  //     }
  //     if (defender.board.allSunk()) break
  //   }
  //   if (defender.board.allSunk()) break
  // }

  // TODO: snake horiz/vert sweep

  // TODO: snake diag sweep

  // completely random
  while (!defender.board.allSunk()) {
    const x = getRandomInt(0, 9)
    const y = getRandomInt(0, 9)

    if (defender.board.canGuess({ x, y })) {
      defender.board.doGuess({ x, y })
      if (DEBUG) await defender.board.print()
      if (defender.board.isHit({ x, y })) await hitSubroutine({ x, y })
    }
  }

  runs.push(defender.board.guessCount)
}

;(async () => {
  const promises = []
  for (let i = 0; i < NUM_RUNS; i++) {
    promises.push(run())
  }

  await Promise.all(promises)

  // console.log(runs)
  console.log(runs.reduce((prev, curr, i) => prev + curr, 0) / NUM_RUNS)
})()
