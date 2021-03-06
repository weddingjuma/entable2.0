/*
https://465f2fb0.ngrok.io/coinbase/verified
https://465f2fb0.ngrok.io/coinbase/notifications
https://465f2fb0.ngrok.io/oauth
*/
import mongoose from 'mongoose';
import * as CoinbaseUSD from '../apiModels/coinbase.usd';

const cbAccountSchema = new mongoose.Schema({
  account: {
    payment_method: { type: String },
    name: { type: String },
    balance: {
      ammount: { type: String },
      currency: { type: String },
    },
    public_address: { type: String },
  },
  deposits: {
    pending: [],
    completed: [],
  },
  withdrawals: {
    pending: [],
    completed: [],
  },
  transactions: {
    pending: [],
    completed: [],
  },
});

cbAccountSchema.statics.getBTCprices = (pair, cb) => {
  let buy;
  let sell;

  CoinbaseUSD.findBTCBuyPrice(pair)
  .then((cbBuy) => {
    buy = cbBuy;
    return CoinbaseUSD.findBTCSellPrice(pair);
  })
  .then((cbSell) => {
    sell = cbSell;
    return cb(null, { pair, buy, sell });
  })
  .catch(err => cb(err));
};

cbAccountSchema.statics.buyBitcoin = (id, amount, cb) => {
  CoinbaseAccount.findById(id)
  .then((dbAcct) => {
    const order = {
      amount,
      current: 'BTC',
      commit: false,
      payment_method: dbAcct.payment_method,
    };
    return CoinbaseUSD.placeBuyOrder(order);
  })
  .then(buyOrder => CoinbaseUSD.commitBuy(buyOrder))
  .then(res => cb(null, {
    SUCCESS: 'Coinbase has successfully purchased Bitcoin using your USD wallet on file.',
    details: res,
  }))
  .catch(error => cb({ ERROR: 'Could not buy Bitcoin.', error }));
};

const CoinbaseAccount = mongoose.model('CoinbaseAccount', cbAccountSchema);

export default CoinbaseAccount;
