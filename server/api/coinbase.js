import express from 'express';
import Coinbase from '../models/dbModels/coinbases';

const router = new express.Router();

router.post('/btc/:transaction_type', (req, res) =>
Coinbase.createTransaction(req.params.transaction_type, res.handle));

router.get('/btc/rate', (req, res) => Coinbase.getExchangeRate(req.body, res.handle));

router.post('/btc/send/:address', (req, res) => Coinbase.sendBitcoin(req.params.address, req.body, res.handle));

// ----------------------------- Webhooks -------------------------------------

router.post('/btc/notifications', (req, res) => CbHooks.saveNotification(req.body, res.handle));

export default router;
