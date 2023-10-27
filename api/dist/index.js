import express from "express";
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
const app = express();
dotenv.config();
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:5173',
    exposedHeaders: ['Authorization'],
    credentials: true, // Allow credentials (e.g., cookies)
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, Swagger Demo!' });
});
app.use("/api/v1", indexRouter);
app.get("/", (req, res) => {
    res.send("hello world!");
});
app.listen(8000, () => {
    console.log("Server connected successfully");
});
//# sourceMappingURL=index.js.map