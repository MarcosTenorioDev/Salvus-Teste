import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Webhook } from 'svix';
import { env } from '../env';
import { UserRepositoryPrisma } from '../repositories/user.repository';
import { UserUseCase } from '../usecases/user.usecases';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for handling webhooks
app.post('/api/webhooks', async (req: Request, res: Response, next: NextFunction) => {

    const userRepositoryPrisma = new UserRepositoryPrisma();
    const userUseCase = new UserUseCase(userRepositoryPrisma);

  // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(500).send("You need a WEBHOOK_SECRET in your .env");
  }

  // Grab the headers and body
  const headers = req.headers;
  const payload: any = req.body;
  const payloadString = JSON.stringify(payload);

  // Get the Svix headers for verification
  const svixId = headers['svix-id'] as string;
  const svixTimestamp = headers['svix-timestamp'] as string;
  const svixSignature = headers['svix-signature'] as string;

  // If there are missing Svix headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).send("Error occurred -- no Svix headers");
  }

  // Initiate Svix
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Attempt to verify the incoming webhook
  try {
    evt = wh.verify(payloadString, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as any;
  } catch (err: any) {
    // Console log and return error
    console.log("Webhook failed to verify. Error:", err.message);
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }

  // Grab the ID and TYPE of the Webhook
  const { id, email_addresses, first_name, last_name } = evt.data;
  const { type, data } = evt;

  // Handle different event types
  try {
    switch (type) {
      case 'user.deleted':
        console.log('user deleted');
        console.log('Webhook body:', data);
        break;
      case 'user.created':
        console.log('user created');
        await userUseCase.create({
            externalId: id,
            firstName: first_name,
            lastName: last_name,
            email: email_addresses[0].email_address,
          });
        break;
      case 'user.updated':
        console.log('user updated');
        console.log('Webhook body:', data);
        break;
      case 'session.ended':
        console.log('Session ended');
        console.log('Webhook body:', data);
        break;
      case 'session.created':
        console.log('Session created');
        console.log('Webhook body:', data);
        break;
      case 'session.revoked':
        console.log('Session revoked');
        console.log('Webhook body:', data);
        break;
      case 'email.created':
        console.log('Email created');
        console.log('Webhook body:', data);
        break;
      case 'session.removed':
        console.log('Session removed');
        console.log('Webhook body:', data);
        break;
      default:
        console.log(`Unhandled event type: ${type}`);
    }

    res.status(200).send({
      success: true,
      message: "Webhook received",
    });

  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
