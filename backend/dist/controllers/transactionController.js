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
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getTransactions = exports.updateTransactionStatus = exports.createTransaction = void 0;
const midtrans_node_client_1 = require("midtrans-node-client");
const uuid_1 = require("uuid");
const Transaction_1 = require("../models/Transaction");
const response_1 = require("../utils/response");
const generateInvoice_1 = require("../utils/generateInvoice");
const sendToMail_1 = require("../utils/sendToMail");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = new Transaction_1.Transaction(req.body); // transaction_id akan auto di-generate
        const savedTransaction = yield newTransaction.save();
        const snap = new midtrans_node_client_1.MidtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY,
            clientKey: process.env.CLIENT_KEY,
        });
        const order_id = (0, uuid_1.v4)();
        const transaction = yield snap.createTransaction({
            payment_type: "bank_transfer",
            bank_transfer: { bank: "bca" },
            transaction_details: {
                order_id,
                gross_amount: savedTransaction.variant.price || 0,
            },
            item_details: [
                {
                    id: (0, uuid_1.v4)(),
                    name: savedTransaction.voucher_name || "Voucher",
                    quantity: 1,
                    price: savedTransaction.variant.price || 40000,
                },
            ],
            customer_details: {
                first_name: "Topup",
                last_name: "Voucher",
                email: savedTransaction.buyer_email || "xxaexa1@gmail.com",
                phone: "08123456789",
                billing_address: {
                    address: "ds yex",
                    city: "city",
                    postal_code: "12345",
                },
            },
            callbacks: {
                finish: `http://localhost:5173/transaction/${savedTransaction.transaction_id}`,
            },
        });
        savedTransaction.order_id = order_id;
        yield savedTransaction.save();
        res.status(201).json((0, response_1.successResponse)("success", {
            transactionId: savedTransaction.transaction_id,
            midtransToken: transaction.token,
        }));
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to create transaction and initiate payment", error));
    }
});
exports.createTransaction = createTransaction;
// update transaction status
const updateTransactionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield Transaction_1.Transaction.findByIdAndUpdate(req.params.id, { payment_status: "paid" }, { new: true });
        if (!transaction) {
            res.status(404).json({ message: "Transaction not found" });
            return;
        }
        res.status(200).json({
            message: "Payment status updated successfully",
            payment_status: transaction.payment_status,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating payment status" });
        return;
    }
});
exports.updateTransactionStatus = updateTransactionStatus;
// Get all transactions
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction_1.Transaction.find();
        res.json((0, response_1.successResponse)("Transactions fetched", transactions));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to fetch transactions", error));
        return;
    }
});
exports.getTransactions = getTransactions;
// Get a single transaction by ID
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield Transaction_1.Transaction.findOne({ transaction_id: req.params.id });
        if (!transaction) {
            res.status(404).json((0, response_1.errorResponse)("Transaction not found"));
            return;
        }
        res.json((0, response_1.successResponse)("Transaction found", transaction));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to fetch transaction", error));
        return;
    }
});
exports.getTransactionById = getTransactionById;
// Update transaction status
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyer_email, delivery_status } = req.body;
        const { id } = req.params;
        // Update delivery status
        const transaction = yield Transaction_1.Transaction.findByIdAndUpdate(req.params.id, { delivery_status }, { new: true });
        if (!transaction) {
            res.status(404).json((0, response_1.errorResponse)("Transaction not found"));
            return;
        }
        // send email
        if (transaction.buyer_email) {
            const html = (0, generateInvoice_1.generateInvoiceTemplate)({
                recipientName: transaction.buyer_email,
                gameName: transaction.voucher_name,
                variation: transaction.variant.name,
                price: transaction.variant.price,
                transactionId: transaction.transaction_id,
                payment_method: transaction.payment_status,
                payment_status: transaction.payment_status,
                delivery_status: transaction.delivery_status,
                date: new Date().toLocaleDateString('id-ID'),
            });
            yield (0, sendToMail_1.sendToMail)(buyer_email, "Invoice Top-up", html);
        }
        res.json((0, response_1.successResponse)("Transaction status updated", transaction));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to update status", error));
        return;
    }
});
exports.updateTransaction = updateTransaction;
// Delete a transaction
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield Transaction_1.Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            res.status(404).json((0, response_1.errorResponse)("Transaction not found"));
            return;
        }
        res.json((0, response_1.successResponse)("Transaction deleted", transaction));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to delete transaction", error));
        return;
    }
});
exports.deleteTransaction = deleteTransaction;
