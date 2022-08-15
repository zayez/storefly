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
  - [Body](resources.md#SignUp-Body)
  - [Success response](resources.md#SignUp-Success)
  - [Error response](resources.md#SignUp-Error)
  - [Example](resources.md#SignUp-Example)
- [Sign In](resources.md#SignIn)
  - [Body](resources.md#SignIn-Body)
  - [Success response](resources.md#SignIn-Success)
  - [Error response](resources.md#SignIn-Error)
  - [Example](resources.md#SignIn-Example)
- [Create category](resources.md#CreateCategory)
  - [Body](resources.md#CreateCategory-Body)
  - [Success response](resources.md#CreateCategory-Success)
  - [Error response](resources.md#CreateCategory-Error)
  - [Example](resources.md#CreateCategory-Example)

### <a name='SuccessResponses'></a> Success responses

#### Create category - Success response

[Back to top](#top)

- **Code**: 201 <br/>
- **Content**:

```json
{
  "title": "Created",
  "message": "The request has succeeded and a new resource has been created",
  "category": {
    "id": 1,
    "title": "Cars",
    "createdAt": "2022-08-15 20:05:36",
    "updatedAt": "2022-08-15 20:05:36"
  }
}
```

### <a name='#ErrorResponses'></a> Error responses

#### Create category - Error response

[Back to top](#top)

- **Code**: 400 <br/>
- **Content**:

```json
{
  "_original": {
    "title": ""
  },
  "details": [
    {
      "message": "\"title\" is not allowed to be empty",
      "path": ["title"],
      "type": "string.empty",
      "context": {
        "label": "title",
        "value": "",
        "key": "title"
      }
    }
  ]
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

### <a name='Examples'></a> Examples

[Back to top](#top)

#### Sign in example

```js
let response = await fetch(`/signin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'email@email.com', password: 'pwd' }),
})
let data = await response.json()
```
