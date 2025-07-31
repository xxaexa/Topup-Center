"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const voucherController_1 = require("../controllers/voucherController");
const JwtMiddleware_1 = require("../middleware/JwtMiddleware");
const router = express_1.default.Router();
router.get("/", voucherController_1.getVouchers);
router.get("/:id", voucherController_1.getVoucherById);
router.get("/game/:name", voucherController_1.getVoucherByGameName);
router.post("/", voucherController_1.createVoucher);
router.put("/:id", JwtMiddleware_1.authenticateToken, voucherController_1.updateVoucher);
router.delete("/:id", voucherController_1.deleteVoucher);
exports.default = router;
