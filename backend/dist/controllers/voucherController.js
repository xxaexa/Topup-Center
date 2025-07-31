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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVoucher = exports.updateVoucher = exports.createVoucher = exports.getVoucherByGameName = exports.getVoucherById = exports.getVouchers = void 0;
const Voucher_1 = require("../models/Voucher");
const response_1 = require("../utils/response");
const slugify_1 = __importDefault(require("slugify"));
// Get all vouchers
const getVouchers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vouchers = yield Voucher_1.Voucher.find();
        res.status(200).json((0, response_1.successResponse)("Fetched vouchers", vouchers));
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to fetch vouchers", error));
    }
});
exports.getVouchers = getVouchers;
// Get one voucher
const getVoucherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voucher = yield Voucher_1.Voucher.find({ _id: req.params.id });
        console.log(req.params.id);
        const list = yield Voucher_1.Voucher.find();
        console.log("Semua nama voucher:");
        list.forEach(v => console.log(v.name));
        if (!voucher) {
            res.status(404).json((0, response_1.errorResponse)("Voucher not found"));
            return;
        }
        res.status(200).json((0, response_1.successResponse)("Fetched voucher", voucher));
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to fetch voucher", error));
    }
});
exports.getVoucherById = getVoucherById;
// Get one Voucher by name 
const getVoucherByGameName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameName = req.params.name;
        console.log("Game name param:", req.params.name);
        const voucher = yield Voucher_1.Voucher.find({ game_name: gameName });
        if (!voucher || voucher.length === 0) {
            res.status(404).json((0, response_1.errorResponse)("Voucher not found"));
            return;
        }
        res.status(200).json((0, response_1.successResponse)("Fetched voucher by game name", voucher));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to fetch voucher", error));
        return;
    }
});
exports.getVoucherByGameName = getVoucherByGameName;
// Create voucher
const createVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { voucher_name, game_name } = _a, rest = __rest(_a, ["voucher_name", "game_name"]);
        const slug = (0, slugify_1.default)(voucher_name, { lower: true, strict: true });
        const newVoucher = new Voucher_1.Voucher(Object.assign({ voucher_id: slug, voucher_name,
            game_name }, rest));
        const savedVoucher = yield newVoucher.save();
        res.status(201).json((0, response_1.successResponse)("Voucher created", savedVoucher));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to create voucher", error));
        return;
    }
});
exports.createVoucher = createVoucher;
// Update voucher
const updateVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Gunakan _id jika id-nya dari MongoDB
        const updated = yield Voucher_1.Voucher.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json((0, response_1.errorResponse)("Voucher not found"));
            return;
        }
        res.status(200).json((0, response_1.successResponse)("Voucher updated", updated));
        return;
    }
    catch (error) {
        res
            .status(500)
            .json((0, response_1.errorResponse)("Failed to update voucher", error.message));
        return;
    }
});
exports.updateVoucher = updateVoucher;
// Delete voucher
const deleteVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Voucher_1.Voucher.findOneAndDelete({ _id: req.params.id });
        res.status(200).json((0, response_1.successResponse)("Voucher deleted", deleted));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to delete voucher", error));
        return;
    }
});
exports.deleteVoucher = deleteVoucher;
