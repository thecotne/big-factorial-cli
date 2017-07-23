const ora = require('ora')
const childProcess = require('child_process')

function bigFactorial (number) {
  return new Promise((resolve, reject) => {
    const child = childProcess.fork(`${__dirname}/factorial-worker.js`)

    child.on('message', data => {
      child.kill()

      resolve(data)
    })

    child.send(number)
  })
}

const number = parseInt(process.argv[2])

const spinner = ora(`Calculating factorial for ${number}`).start()

bigFactorial(number)
  .then(result => {
    spinner.succeed(`Calculating factorial for ${number} is ${result}`)
  })
