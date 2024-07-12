import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { env } from "./env";
import { webhookClerk } from "./routes/clerkWebhook.routes";

const app = express();
const port = parseInt(env.PORT as string);
dotenv.config();

app.use(cors());

app.get("/health", (req: Request, res: Response) => {
	res.send({
		status: "OK!",
	});
});

app.use('/clerk', webhookClerk)
app.listen({ port: port || 3000, host: '0.0.0.0' }, () => {
    console.log(`Server is running on port: ${port}`);
});
