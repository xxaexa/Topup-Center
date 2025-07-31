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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
// register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const exist = yield User_1.User.findOne({ email });
        if (exist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const existingName = yield User_1.User.findOne({ name });
        if (existingName) {
            res.status(400).json({ message: "Name already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        let user = yield User_1.User.create({ name, email, password: hashedPassword });
        res.status(201).json((0, response_1.successResponse)("success", user));
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to register user", error));
        return;
    }
});
exports.registerUser = registerUser;
// login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user._id.toString());
        console.log(jwt_1.generateAccessToken);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user._id.toString());
        res.json({
            message: "Login success",
            user: { name: user.name, email: user.email },
            accessToken
        });
        return;
    }
    catch (error) {
        res.status(500).json((0, response_1.errorResponse)("Failed to login", error));
        return;
    }
});
exports.loginUser = loginUser;
// refresh
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh = req.cookies.refreshToken;
    if (!refresh)
        return res.status(401).json({ message: "No refresh token" });
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(refresh);
        const newAccessToken = (0, jwt_1.generateAccessToken)(decoded.userId);
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        res.json({ message: "Token refreshed" });
    }
    catch (err) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
});
exports.refreshToken = refreshToken;
