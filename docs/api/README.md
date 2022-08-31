# Storefly REST API – Documentation

- [Overview](#Overview)
- [Authentication](#Authentication)
- [Resources](#Resources)
- [Success responses](#SuccessResponses)
- [Error responses](#ErrorResponses)
- [Examples](#Examples)

## <a name='Overview'></a> Overview

[Back to top](#top)

Learn about resources, general status codes and troubleshooting for the REST API.

## <a name='Authentication'></a> Authentication

[Back to top](#top)

Authentication is done using JSON Web Tokens (JWT). Users will need to sign in to receive an access token. A token is also provided when a user signs up.

## <a name='Resources'></a> [Resources](resources.md)

[Back to top](#top)

Lists the available resources available for the REST API.

- [Sign Up](resources.md#SignUp)
- [Sign In](resources.md#SignIn)
- [Create category](resources.md#CreateCategory)
- [Update category](resources.md#UpdateCategory)
- [Get category](resources.md#GetCategory)
- [Get categories](resources.md#GetCategories)
- [Create product](resources.md#CreateProduct)
- [Update product](resources.md#UpdateProduct)
- [Get product](resources.md#GetProduct)
- [Get products](resources.md#GetProducts)

[Back to top](#top)

## <a name='SuccessResponses'></a> Success responses

- **Code**: 200 (OK)
- **Content**:

  ```json
  {
    "id": 1,
    "title": "Books",
    "createdAt": "2022-08-15 20:05:36",
    "updatedAt": "2022-08-15 20:05:36"
  }
  ```

OR

- **Code**: 201 (CREATED)
- **Content**:

  ```json
  {
    "id": 1,
    "title": "Eletronics",
    "createdAt": "2022-08-15 20:05:36",
    "updatedAt": "2022-08-15 20:05:36"
  }
  ```

## <a name='#ErrorResponses'></a> Error responses

[Back to top](#top)

- **Code**: 400 (BAD REQUEST)
- **Content**:

  ```json
  {
    "status": 400,
    "title": "Bad Request",
    "detail": "The server could not understand the request due to invalid syntax."
  }
  ```

OR

- **Code**: 401 (UNAUTHORIZED)
- **Content**:

  ```json
  {
    "status": 401,
    "title": "Unauthorized",
    "detail": "The request lacks valid authentication credentials for the requested resource."
  }
  ```

OR

- **Code**: 403 (FORBIDDEN)
- **Content**:

  ```json
  {
    "status": 403,
    "title": "Forbidden",
    "detail": "The client does not have access rights to the content."
  }
  ```

  OR

- **Code**: 404 (NOT FOUND)
- **Content**:

  ```json
  {
    "status": 404,
    "title": "Not Found",
    "detail": "The server can not find the requested resource."
  }
  ```

  OR

- **Code**: 409 (CONFLICT)
- **Content**:

  ```json
  {
    "status": 409,
    "title": "Conflict",
    "detail": "The request conflicts with the current state of the server."
  }
  ```

  OR

- **Code**: 422 (UNPROCESSABLE)
- **Content**: application/problem+json:

  ```json
  {
    "status": 422,
    "title": "Unprocessable",
    "detail": "The request was unable to process the contained entity.",
    "invalid-params": [
      {
        "name": "title",
        "reason": "Title is not allowed to be empty"
      },
      {
        "name": "price",
        "reason": "Invalid price, the price must be positive"
      }
    ]
  }
  ```

  OR

- **Code**: 500 (INTERNAL SERVER ERROR)
- **Content**:

  ```json
  {
    "status": 500,
    "title": "Internal server error",
    "detail": "A fatal error occured."
  }
  ```

## <a name='Examples'></a> Examples

[Back to top](#top)

### Sign in example

```js
let response = await fetch(`/signin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'email@email.com', password: 'pwd' }),
})
let data = await response.json()
```
