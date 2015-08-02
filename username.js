var express = require('express')
var helpers = require('./helpers')
var fs = require('fs')

var User = require('./db').User

var router = express.Router({
  mergeParams: true
})

router.use(function (req, res, next) {
  console.log(req.method, 'for', req.params.username, 'at', req.path)
  next()
})

router.get('/', function (req, res) {
  var username = req.params.username
  User.findOne({username: username}, function (err, user) {
    res.render('user', {
      user: user,
      address: user.location
    })
  })
})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

router.put('/', function (req, res) {
  var username = req.params.username

  User.findOneAndUpdate({username: username}, {location: req.body}, function (err, user) {
    res.end()
  })
})

router.delete('/', function (req, res) {
  var fp = helpers.getUserFilePath(req.params.username)
  fs.unlinkSync(fp) // delete the file
  res.sendStatus(200)
})

module.exports = router
