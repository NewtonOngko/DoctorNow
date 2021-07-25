const Withdraw = require('../model/withdraw_model.js')

exports.findAll = function getWithdraw(req, res) {
  Withdraw.findAll((err, withdraw) => {
    console.log('get all topUp')
    if (err) res.send(err)
    console.log('res', withdraw)
    res.send(withdraw)
  })
}

exports.create = function addWithdraw(req, res) {
  const newWithdraw = new Withdraw(req.body)
  Withdraw.create(newWithdraw, (err, withdraw) => {
    if (err) res.send(err)
    res.json({
      error: false,
      message: 'Withdraw added',
      data: { withdraw },
    })
  })
}

exports.findById = function getWithdrawById(req, res) {
  Withdraw.findById(req.params.id, (err, withdraw) => {
    if (err) res.send(err)
    res.json(withdraw)
  })
}

exports.update = function updateTopUp(req, res) {
  Withdraw.update(req.params.id, new Withdraw(req.body), (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Withdraw updated' })
  })
}

exports.delete = function deleteWithdraw(req, res) {
  Withdraw.delete(req.params.id, (err) => {
    if (err) res.send(err)
    res.json({ error: false, message: 'Withdraw deleted' })
  })
}
