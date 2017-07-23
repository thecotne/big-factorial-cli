const bigFactorial = require('big-factorial')

process.on('message', data => {
  process.send(bigFactorial(data).toString())
})
