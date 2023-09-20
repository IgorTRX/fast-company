const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/signUp', async (req, res) => {
  // body func
})

router.post('/signInWithPassword', async (req, res) => {
  // body func
})

router.post('/token', async (req, res) => {
  // body func
})

module.exports = router
