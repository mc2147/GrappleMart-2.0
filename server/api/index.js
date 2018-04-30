const router = require('express').Router()
const countryCodes = require('../../client/globals');
module.exports = router

router.use('/users', require('./users'))

router.use('/courses', require('./courses'))

router.use('/uploads', require('./uploads'))

router.use('/products', require('./products'))

router.get('/country-seeds', (req, res) => {
  let countrySeeds = {};
  countryCodes['countryCodes'].forEach(elem => {
    let randomNum = Math.floor(200*Math.random());
    countrySeeds[elem.code] = {purchases: randomNum}    
  })
  // for (var K in countryCodes['countryCodes']) {
  //   let randomNum = Math.floor(200*Math.random());
  //   countrySeeds[K] = {purchases: randomNum}
  // }
  res.send(JSON.stringify(countrySeeds));
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
