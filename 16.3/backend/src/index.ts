import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import path from "path";

dotenv.config();

const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    const JWT_SECRET = `${process.env.JWT_SECRET}`
    
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);

    res.cookie("token", token);
    res.send("Sign in complited");
})

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const JWT_SECRET = `${process.env.JWT_SECRET}`
    const id = jwt.verify(token, JWT_SECRET);
    res.send(id);
})
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})
