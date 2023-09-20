const express = require('express')
const Quality = require('../models/Quality')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const qualities = await Quality.find()
    res.status(200).send(qualities)
  } catch (error) {
    res
      .status(500)
      .json({ massage: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

module.exports = router
