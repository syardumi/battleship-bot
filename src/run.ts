import { Defender, getRandomInt } from './defender'

function waitForKey(keyCode) {
  return new Promise((resolve) => {
    process.stdin.on('data', function (chunk) {
      if (chunk[0] === keyCode) {
        resolve(null)
        process.stdin.pause()
      }
    })
  })
}

const runs = []

const run = async () => {
  const defender = new Defender()

  let guessCount = 0
  let prevHitStack = []
  let directionStack = []

  do {
    // completely random
    let x = getRandomInt(0, 9)
    let y = getRandomInt(0, 9)
    // if (prevHitStack.length) {
    //   defender.board.print()
    //   console.log(prevHitStack)
    //   await waitForKey(10)

    //   switch (directionStack.length) {
    //     case 0:
    //       if (x - 1 < 0) directionStack.push({ x: x - 1, y })
    //       else x -= 1
    //       break
    //     case 1:
    //       if (y - 1 < 0) directionStack.push({ x, y: y - 1 })
    //       else y -= 1
    //       break
    //     case 2:
    //       if (x + 1 >= 10) directionStack.push({ x: x + 1, y })
    //       else x += 1
    //       break
    //     case 3:
    //       if (y + 1 >= 10) directionStack.push({ x, y: y + 1 })
    //       else y += 1
    //       break
    //     default:
    //       directionStack = []
    //       prevHitStack = []
    //       break
    //   }
    // }

    if (defender.board.canGuess({ x, y })) {
      defender.board.doGuess({ x, y })
      //   if (defender.board.isHit({ x, y })) prevHitStack.push({ x, y })
      //   else if (prevHitStack.length) directionStack.push({ x, y })
      guessCount++
    }
  } while (!defender.board.allSunk())
  runs.push(guessCount)
  defender.board.print()
}

// for (let i = 0; i < 10; i++) {
run()
// }

// console.log(runs)
