# Resume Builder API

This is the documentation for the Resume Builder API.

## Table of Contents

- [GET /resumes]
- [GET /resumes/{id}]
- [POST /resumes]
- [PUT /resumes/{id}]
- [DELETE /resumes/{id}]

## Authentication

All routes except for `POST /users` require a JSON Web Token (JWT) to be passed in the `authorization` header. To obtain a JWT, send a `POST` request to `/api/signup` with the following body: 
```
{
  "name": "john doe",
  "email": "john.doe@example.com",
  "password": "password"
}
```

or to `/api/signin` with the following body:
```
{
  "email": "john.doe@example.com",
  "password": "password"
}
```


The response will include a JWT that can be used to authenticate subsequent requests.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDUwN2Q5ODIyNzc4ZTAwMTA5NzZlZTIiLCJpYXQiOjE1NjU5NzM1MTcsImV4cCI6MTU2NTk3NzExN30.6qhgucO7-peK9sQyF1zs0vMd_jmwc_yyZTfTkyCvTBM"
}
```

## API Reference

#### Get all resumes

```http
  curl -X GET \
  /api/resumes \
  -H 'authorization: {JWT}'
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "_id": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Software Developer",
    "skills": [
      "JavaScript",
      "Node.js",
      "MongoDB"
    ]
  },
  // More resumes...
]

```

#### Get single resume

```http
  curl -X GET \
  /api/resumes/{$id} \
  -H 'authorization: {JWT}'
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of resume to fetch |

```
HTTP/1.1 200 OK
Content-Type: application/json


  {
    "_id": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "position": "Software Developer",
    "skills": [
      "JavaScript",
      "Node.js",
      "MongoDB"
    ]
  }

```
curl -X GET \
  http://localhost:3000/resumes/{id} \
  -H 'Authorization: Bearer {JWT}'
