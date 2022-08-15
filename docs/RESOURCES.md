<a name="top"></a>

# Resources

- [Sign Up](#SignUp)
  - [Body](#SignUp-Body)
  - [Success response](#SignUp-Success)
  - [Error response](#SignUp-Error)
  - [Example](#SignUp-Example)
- [Sign In](#SignIn)
  - [Body](#SignIn-Body)
  - [Success response](#SignIn-Success)
  - [Error response](#SignIn-Error)
  - [Example](#SignIn-Example)
- [Create category](#CreateCategory)
  - [Body](#CreateCategory-Body)
  - [Success response](#CreateCategory-Success)
  - [Error response](#CreateCategory-Error)

## <a name='SignUp'></a> Sign Up

[Back to top](#top)

Creates a new user and responds with an access token if user was successfully created.

|        |         |
| ------ | ------- |
| Title  | Sign Up |
| URL    | /signup |
| Method | POST    |

### <a name='SignUp-Body'></a> Body

[Back to top](#top)

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| email     | String | Yes       |
| password  | string | Yes       |
| firstName | string | Yes       |
| lastName  | string | Yes       |

### <a name='SignUp-Success'></a> Success response

[Back to top](#top)

- **Code**: 201 <br/>
- **Content**:

  ```json
  {
    "title": "Created",
    "message": "The request has succeeded and a new resource has been created",
    "token": "the-users-access-token"
  }
  ```

### <a name='SignUp-Error'></a> Error response

[Back to top](#top)

- **Code**: 400 <br/>
- **Content**:

  ```json
  {
    "title": "Bad request",
    "message": "The server could not understand the request."
  }
  ```

OR

- **Code**: 403 <br/>
- **Content**:

```json
{
  "title": "Forbidden",
  "message": "The client does not have access rights to the content."
}
```

OR

- **Code**: 409 <br/>
- **Content**:

```json
{
  "title": "Conflict",
  "message": "The request conflicts with the current state of the server"
}
```

OR

- **Code**: 422 <br/>
- **Content**:

```json
{
  "title": "Unprocessable",
  "message": "The request was unable to process the contained entity"
}
```

### <a name='SignUp-Example'></a> Example

[Back to top](#top)

```js
let response = await fetch(`/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'email@email.com',
    password: 'pwd',
    firstName: 'Joe',
    lastName: 'Doe',
  }),
})
let data = await response.json()
```

## <a name='SignIn'></a> Sign In

[Back to top](#top)

Sign in a user. Responds with an access token if request was successful.

|        |         |
| ------ | ------- |
| Title  | Sign In |
| URL    | /signin |
| Method | POST    |

### <a name='SignIn-Body'></a> Body

[Back to top](#top)

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| email     | String | Yes       |
| password  | string | Yes       |

### <a name='SignIn-Success'></a> Success response

[Back to top](#top)

- **Code**: 200 <br/>
- **Content**:

  ```json
  {
    "title": "Ok",
    "message": "The request has succeeded.",
    "token": "the-users-access-token"
  }
  ```

### <a name='SignIn-Error'></a> Error response

[Back to top](#top)

- **Code**: 400 <br/>
- **Content**:

  ```json
  {
    "title": "Bad request",
    "message": "The server could not understand the request."
  }
  ```

OR

- **Code**: 403 <br/>
- **Content**:

```json
{
  "title": "Forbidden",
  "message": "The client does not have access rights to the content."
}
```

## <a name='CreateCategory'></a> Create category

[Back to top](#top)

Creates a new category and responds with category contents if category was successfully created. Can only be created by users with **admin** role.

|        |             |
| ------ | ----------- |
| Title  | Create card |
| URL    | /categories |
| Method | POST        |

### <a name='CreateCategory-Body'></a> Body

[Back to top](#top)

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| title     | string | Yes       |
