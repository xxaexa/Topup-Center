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
exports.Transaction = void 0;
// models/Transaction.ts
const mongoose_1 = require("mongoose");
const Counter_1 = require("./Counter");
const TransactionSchema = new mongoose_1.Schema({
    transaction_id: { type: String, unique: true }, // Auto-generated
    buyer_email: { type: String, required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    voucher_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Voucher", required: true },
    voucher_name: { type: String, required: true },
    variant: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    buyer_inputs: {
        type: Map,
        of: String,
        required: true,
    },
    payment_status: {
        type: String,
        enum: ["pending", "paid", "failed", "expired"],
        default: "pending",
    },
    delivery_status: {
        type: String,
        enum: ["pending", "processing", "success", "failed"],
        default: "pending",
    },
    payment_method: {
        type: String,
        default: null,
    },
    order_id: { type: String },
}, { timestamps: true });
// Middleware untuk auto-increment transaction_id
TransactionSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew && !this.transaction_id) {
            const counter = yield Counter_1.Counter.findByIdAndUpdate({ _id: "transaction" }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            this.transaction_id = `TRX-${String(counter.seq).padStart(3, "0")}`;
        }
        next();
    });
});
exports.Transaction = mongoose_1.models.Transaction || (0, mongoose_1.model)("Transaction", TransactionSchema);
