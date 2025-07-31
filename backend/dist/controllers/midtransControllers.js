"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.midtransCallback = void 0;
const Transaction_1 = require("../models/Transaction");
const midtransCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        console.log('Callback Midtrans diterima:', payload);
        const { transaction_status, order_id, fraud_status, payment_type, } = payload;
        // Cari transaksi berdasarkan order_id
        const transaction = yield Transaction_1.Transaction.findOne({ order_id });
        if (!transaction) {
            console.error(`Transaksi dengan order_id ${order_id} tidak ditemukan`);
            res.status(404).send('Transaction not found');
            return;
        }
        // Update payment_status dan payment_method
        if (transaction_status === 'settlement') {
            transaction.payment_status = 'paid';
            transaction.payment_method = payment_type;
            yield transaction.save();
            console.log(`Pembayaran sukses untuk order ${order_id}`);
        }
        else if (transaction_status === 'cancel' || transaction_status === 'expire') {
            transaction.payment_status = transaction_status === 'cancel' ? 'failed' : 'expired';
            transaction.payment_method = payment_type;
            yield transaction.save();
            console.log(`Pembayaran gagal untuk order ${order_id}`);
        }
        res.status(200).send('OK');
        return;
    }
    catch (error) {
        console.error('Error di callback Midtrans:', error);
        res.status(500).send('Internal Server Error');
        return;
    }
});
exports.midtransCallback = midtransCallback;
