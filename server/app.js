const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const app = express()

const PORT = config.get('port') ?? 8080

// if (process.env.NODE_ENV === 'production') {
//   console.log('Productions')
// } else {
//   console.log('Development')
// }

app.listen(PORT, () => {
  console.log(chalk.green(`Server has been started on port ${PORT}`))
})
