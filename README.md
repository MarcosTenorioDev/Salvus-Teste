# Salvus - Junior Developer Test

## Access here: [https://salvus-teste.vercel.app/](https://salvus-teste.vercel.app/)

Med + is a fullstack application developed as part of a technical test for a junior developer position at Salvus. The project consists of an e-commerce platform for medical products, allowing the creation, editing, and viewing of products with multiple images, pricing, and detailed descriptions.

![image](https://github.com/user-attachments/assets/4a0af80a-f946-472e-959b-1a8a83203161)

## Features

- **Product Creation**: Allows users to create products with multiple images and detailed information.
- **Product Editing**: Functionality to edit information and images of existing products.
- **Request Authentication**: Provides users with greater security for editing their products, as they can only be edited with a valid authorization token and only by the creator of the product.
  ![salvus-teste vercel app_managment_product_ae4e5daf-d163-44cd-91a8-13434d66524c](https://github.com/user-attachments/assets/73655860-88af-4c41-bb83-27b14b8f36fd)

- **Product Viewing**: Allows users to view product details, including images in a carousel.
- **100% Responsive**: Application created following mobile-first principles.

- **User Profile Management... account creation, editing, and deletion**: Allows users to view product details, including images in a carousel.
![image](https://github.com/user-attachments/assets/4eca1496-d18e-42e3-9595-d420c339c241)

## Technologies Used

### Backend
Tip: There is a file named 'Salvus.postman_collection.json', use it to see examples of requests in Postman. If you want to obtain a token, log in to the application, go to the 'developer console' > 'application' > 'Cookies' > '_session'. This is your request authentication token. Remember, it expires quickly for the application's security, so once you get the token, put it in Postman and make your request.

- **Node.js**: Development platform for building the backend server.
- **Express**: Web framework used to create the server and manage routes.
- **Prisma**: ORM used to manage the database and perform efficient queries.
- **AWS SDK**: An Amazon S3 bucket was used for image storage, aiming to reduce server storage and processing by utilizing only the URLs returned by the service.
- **Clerk**: Used for user authentication and authorization.
- **Multer**: Middleware for handling file uploads.
- **MySQL**: Relational database. (entities: products, assets, and user)

### Frontend

- **React.js**: Library for building user interfaces.
- **Tailwind CSS**: Utility CSS framework for styling components.
- **Clerk**: Library for authentication and user management.
- **Shadcn**: Open-source UI component library.

### Deployment Services:
- Backend: Railway - [https://salvus-teste-production.up.railway.app/health](https://salvus-teste-production.up.railway.app/health)
- Database: Railway
- Frontend: Vercel - [https://salvus-teste.vercel.app](https://salvus-teste.vercel.app)

### Project Setup and Execution:

**Step 1 - Clone the Repository**
- Open a git bash terminal
- `git clone <REPOSITORY_URL>`

**Run the backend:**
- Access the /backend directory (run `cd backend` in the terminal) and install dependencies (run `npm i` in the terminal)
- Fill in the .env variables specified in .env.sample
- Run the command `npm run dev` in the terminal

**Run the frontend:**
- Access the /frontend directory (run `cd frontend` in the terminal) and install dependencies (run `npm i` in the terminal)
- Fill in the .env variables specified in .env.sample
- Run the command `npm run dev` in the terminal

## Made with love 💚 by MarcosTenorio 🚀
