const { subject } = require('@casl/ability')

const { policyFor } = require('../../utils')
// const Invoice = require('../models/Invoice')
const { Invoice } = require('../models')

const getOne = async (req, res, next) => {
  const { order_id } = req.param
  const user = req.user

  try {
    const invoice = await Invoice.findOne({
      order: order_id,
    })
      .populate('order')
      .populate('user')

    let policy = policyFor(user)
    let subjectInvoice = subject('Invoice', { ...invoice, user_id: invoice.user._id })

    if (!policy.can('read', subjectInvoice)) {
      return res.status(401).json({
        message: `Anda tidak memiliki akses untuk melihat invoice ini.`,
      })
    }

    return res.status(200).json(invoice)
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
}

module.exports = {
  getOne,
}
