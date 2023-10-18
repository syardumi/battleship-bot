import { Defender, getRandomInt } from './defender'

const NUM_RUNS = 25000
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
      // await defender.board.print()
      if (defender.board.isHit({ x: x - 1, y }))
        await hitSubroutine({ x: x - 1, y })
    }
    if (defender.board.allSunk()) return

    // up
    if (defender.board.canGuess({ x, y: y - 1 })) {
      defender.board.doGuess({ x, y: y - 1 })
      // await defender.board.print()
      if (defender.board.isHit({ x, y: y - 1 }))
        await hitSubroutine({ x, y: y - 1 })
    }
    if (defender.board.allSunk()) return

    // right
    if (defender.board.canGuess({ x: x + 1, y })) {
      defender.board.doGuess({ x: x + 1, y })
      // await defender.board.print()
      if (defender.board.isHit({ x: x + 1, y }))
        await hitSubroutine({ x: x + 1, y })
    }
    if (defender.board.allSunk()) return

    // down
    if (defender.board.canGuess({ x, y: y + 1 })) {
      defender.board.doGuess({ x, y: y + 1 })
      // await defender.board.print()
      if (defender.board.isHit({ x, y: y + 1 }))
        await hitSubroutine({ x, y: y + 1 })
    }
  }

  do {
    // completely random
    const x = getRandomInt(0, 9)
    const y = getRandomInt(0, 9)

    // TODO: checkerboard pattern

    // TODO: snake horiz/vert sweep

    // TODO: snake diag sweep

    if (defender.board.canGuess({ x, y })) {
      defender.board.doGuess({ x, y })
      // await defender.board.print()
      if (defender.board.isHit({ x, y })) await hitSubroutine({ x, y })
    }
  } while (!defender.board.allSunk())
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
