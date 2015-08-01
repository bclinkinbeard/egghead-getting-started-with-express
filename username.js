var express = require('express')
var helpers = require('./helpers')
var fs = require('fs')

var router = express.Router({
  mergeParams: true
})

router.all('/', function (req, res, next) {
  console.log(req.method, 'for', req.params.username)
  next()
})

router.get('/', helpers.verifyUser, function (req, res) {
  var username = req.params.username
  var user = helpers.getUser(username)
  res.render('user', {
    user: user,
    address: user.location
  })
})

router.get('/edit', function (req, res) {
  res.send('You want to edit ' + req.params.username + '???')
})

router.put('/', function (req, res) {
  var username = req.params.username
  var user = helpers.getUser(username)
  user.location = req.body
  helpers.saveUser(username, user)
  res.end()
})

router.delete('/', function (req, res) {
  var fp = helpers.getUserFilePath(req.params.username)
  fs.unlinkSync(fp) // delete the file
  res.sendStatus(200)
})

module.exports = router
