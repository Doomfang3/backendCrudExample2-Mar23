const express = require('express')
const router = express.Router()

// All routes in there starts with /example

router.get('/', (req, res, next) => {
  res.send('Example')
})

router.get('/:someId/pizza', (req, res, next) => {
  res.send('Some other example')
})

module.exports = router
