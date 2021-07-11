const midtransClient = require('midtrans-client')
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-5Z74j_Q6IgPlrFOhCoeE90xq',
  clientKey: 'SB-Mid-client-vlAQYYxG6qx0L-9N',
})

module.exports = snap
