"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midtransControllers_1 = require("../controllers/midtransControllers");
const router = express_1.default.Router();
router.post('/callback', midtransControllers_1.midtransCallback);
exports.default = router;
