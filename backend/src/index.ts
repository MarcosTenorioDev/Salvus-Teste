import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { env } from "./env";
import webhookClerk from "./routes/clerkWebhook.routes";
import bodyParser from "body-parser";
import productRoutes from './routes/product.routes'
import assetsRoutes from './routes/asset.routes'
import userRoutes from "./routes/user.routes"

const app = express();
const port = parseInt(env.PORT as string);
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
	res.send({
		status: "OK!",
	});
});

app.use('/clerk', webhookClerk)
app.use('/products', productRoutes)
app.use("/assets", assetsRoutes), 
app.use("/user", userRoutes)

app.listen({ port: port || 3000, host: '0.0.0.0' }, () => {
    console.log(`Server is running on port: ${port}`);
});
