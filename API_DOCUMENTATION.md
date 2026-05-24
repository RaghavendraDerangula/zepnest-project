\# API Documentation



\## Authentication APIs



\### Register User

POST /api/auth/register



Body:

{

&#x20; "name": "Raghavendra",

&#x20; "email": "test@gmail.com",

&#x20; "password": "123456"

}



\---



\### Login User

POST /api/auth/login



Body:

{

&#x20; "email": "test@gmail.com",

&#x20; "password": "123456"

}



\---



\## Service Request APIs



\### Get All Requests

GET /api/requests



\---



\### Create Request

POST /api/requests



Form Data:

\- title

\- description

\- category

\- address

\- preferred\_time

\- image



\---



\### Update Request Status

PUT /api/requests/:id



Body:

{

&#x20; "status": "Completed"

}



\---



\### Delete Request

DELETE /api/requests/:id

