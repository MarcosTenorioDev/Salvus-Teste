import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv'

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(cors());

app.get("/health", (req: Request, res: Response) => {
	res.send({
		status: "OK!",
	});
});

app.listen({ port: port || 3000, host: '0.0.0.0' }, () => {
    console.log(`Server is running on port: ${port}`);
});
