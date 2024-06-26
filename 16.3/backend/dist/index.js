"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = 3000 || process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = `${process.env.JWT_SECRET}`;
    const token = jsonwebtoken_1.default.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token);
    res.send("Sign in complited");
});
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const JWT_SECRET = `${process.env.JWT_SECRET}`;
    const id = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    res.send(id);
});
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});
