/*
https://465f2fb0.ngrok.io/coinbase/verified
https://465f2fb0.ngrok.io/coinbase/notifications
https://465f2fb0.ngrok.io/oauth
*/
import dotenv from 'dotenv';
import Promise from 'bluebird';
import coinbaseNode from 'coinbase';

dotenv.load({ silent: true });

const Client = coinbaseNode.Client;
const coinbase = new Client({
  apiKey: process.env.COINBASE_API_KEY,
  apiSecret: process.env.COINBASE_API_SECRET,
});

export const findAccounts = () =>
Promise.fromCallback(cb => coinbase.getAccounts({}, cb));


export const findBTCBuyPrice = pair =>
Promise.fromCallback((cb) => {
  const cross = pair.toUpperCase();
  return coinbase.getBuyPrice({ currencyPair: `BTC-${cross}` }, cb);
});
// findBTCBuyPrice('usd');

export const findAccountById = id =>
Promise.fromCallback(cb => coinbase.getAccount(id, cb));
// findAccountById('46d59554-234c-5cc6-9eb3-83c6e9d0cf1b');

export const findUser = () =>
Promise.fromCallback(cb => coinbase.getCurrentUser(cb));
