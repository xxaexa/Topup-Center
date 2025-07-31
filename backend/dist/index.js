"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const voucherRoute_1 = __importDefault(require("./routes/voucherRoute"));
const transactionRoute_1 = __importDefault(require("./routes/transactionRoute"));
const midtrans_1 = __importDefault(require("./routes/midtrans"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "https://fe-topup-online.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.connectDB)();
app.get("/", (req, res) => {
    res.send({ message: "Server Connected" });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.use("/api/auth", authRoute_1.default);
app.use("/api/voucher", voucherRoute_1.default);
app.use("/api/transaction", transactionRoute_1.default);
app.use("/api/midtrans", midtrans_1.default);
