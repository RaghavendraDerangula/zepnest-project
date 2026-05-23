\# 🏠 ZepNest — Service Request Application



\## 📋 Table of Contents



\- About the Project

\- Features

\- Tech Stack

\- Project Structure

\- Getting Started

\- Environment Variables

\- Database Schema

\- API Endpoints

\- Deployment

\- Screenshots

\- Author



\---



\# 📖 About the Project



ZepNest is a full-stack web application that allows users to create, manage, update, and track home service requests efficiently.



Users can:

\- Register/Login securely

\- Create service requests

\- Upload request images

\- Track request status

\- Search \& filter requests

\- Cancel or delete requests



The project is fully responsive and deployed online using modern cloud platforms.



\---



\# ✨ Features



\- User Authentication (JWT)

\- Create Service Requests

\- Upload Images

\- Search Requests

\- Filter by Status

\- Update Request Status

\- Cancel Requests

\- Delete Requests

\- Responsive Dashboard

\- MySQL Database Integration

\- Full Stack Deployment



\---



\# 🛠️ Tech Stack



\## Frontend

\- React.js

\- Bootstrap

\- Axios

\- React Router DOM

\- React Toastify



\## Backend

\- Node.js

\- Express.js

\- MySQL

\- JWT Authentication

\- Multer



\## Deployment

\- Vercel

\- Render

\- Railway MySQL



\---



\# 📂 Project Structure



```bash

client/

├── src/

│   ├── components/

│   ├── pages/

│   ├── services/

│   └── App.js



server/

├── controllers/

├── routes/

├── middleware/

├── uploads/

├── config/

└── server.js

```



\---



\# ⚙️ Getting Started



\## Clone Repository



```bash

git clone https://github.com/RaghavendraDerangula/zepnest-project.git

```



\## Frontend Setup



```bash

cd client

npm install

npm start

```



\## Backend Setup



```bash

cd server

npm install

npm start

```



\---



\# 🔑 Environment Variables



Create `.env` file inside server folder.



```env

PORT=5000



DB\_HOST=your\_host

DB\_USER=your\_user

DB\_PASSWORD=your\_password

DB\_NAME=your\_database



JWT\_SECRET=your\_secret\_key

```



\---



\# 🗄️ Database Schema



\## Users Table



```sql

CREATE TABLE users (

&#x20; id INT PRIMARY KEY AUTO\_INCREMENT,

&#x20; name VARCHAR(100),

&#x20; email VARCHAR(100) UNIQUE,

&#x20; password VARCHAR(255),

&#x20; created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);

```



\## Service Requests Table



```sql

CREATE TABLE service\_requests (

&#x20;   id INT AUTO\_INCREMENT PRIMARY KEY,

&#x20;   user\_id INT NOT NULL,

&#x20;   title VARCHAR(255) NOT NULL,

&#x20;   description TEXT NOT NULL,

&#x20;   category VARCHAR(255),

&#x20;   address TEXT,

&#x20;   preferred\_time VARCHAR(255),

&#x20;   image VARCHAR(255),

&#x20;   status VARCHAR(50) DEFAULT 'Pending',

&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);

```



\---



\# 🔌 API Endpoints



\## Authentication



\- POST `/api/auth/register`

\- POST `/api/auth/login`



\## Requests



\- GET `/api/requests`

\- POST `/api/requests`

\- PUT `/api/requests/:id`

\- DELETE `/api/requests/:id`



\---



\# 🚀 Deployment



Frontend:

https://zepnest-tau.vercel.app



Backend:

https://zepnest-backend.onrender.com



\---



\# 📸 Screenshots



(Add screenshots here later)



\---



\# 👨‍💻 Author



Raghavendra Derangula



📧 Email:

raghavendraderangulaa@gmail.com



GitHub:

https://github.com/RaghavendraDerangula

