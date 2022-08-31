<a name="top"></a>

# Resources

- [Sign Up](#SignUp)
- [Sign In](#SignIn)
- [Create category](#CreateCategory)
- [Update category](#UpdateCategory)
- [Get category](#GetCategory)
- [Get categories](#GetCategories)
- [Create product](#CreateProduct)
- [Update product](#UpdateProduct)
- [Get product](#GetProduct)
- [Get products](#GetProducts)

## <a name='SignUp'></a> Sign Up

Creates a new user and responds with an access token if user was successfully created.

| Title  | Sign Up |
| ------ | ------- |
| URL    | /signup |
| Method | POST    |

### Body

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| email     | string | Yes       |
| password  | string | Yes       |
| firstName | string | Yes       |
| lastName  | string | Yes       |

### Success response

- **Code**: 201 <br/>
- **Content**: { token: "ri34rIUnp34f2IEcsruyW" }

### Error response

- **Code**: 400 OR 409 OR 422

### Example

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

[Back to top](#top)

## <a name='SignIn'></a> Sign In

Sign in a user. Responds with an access token if request was successful.

| Title  | Sign In |
| ------ | ------- |
| URL    | /signin |
| Method | POST    |

### Body

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| email     | String | Yes       |
| password  | string | Yes       |

### Success response

- **Code**: 200
- **Content**: { "token": "isv34eYUkwy#Xarsyu#0458X" }

### Error response

- **Code**: 400 or 422 or 500

[Back to top](#top)

## <a name='CreateCategory'></a> Create category

Creates a new category and responds with category contents if category was successfully created. Can only be created by users with **admin** role.

| Title         | Create a category |
| ------------- | ----------------- |
| URL           | /categories       |
| Method        | POST              |
| Authorization | admin             |

### Body

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| title     | string | Yes       |

### Success response

- **Code**: 201

### Error response

- **Code**: 400 OR 401 OR 403 OR 409 OR 422

## <a name='UpdateCategory'></a> Update category

Updates a category and responds with category contents if category was successfully updated. Can only be updated by users with **admin** role.

| Title         | Update a category |
| ------------- | ----------------- |
| URL           | /categories       |
| Method        | PATCH             |
| Authorization | admin             |

### Body

| Parameter | type   | Required? |
| --------- | ------ | --------- |
| title     | string | Yes       |

### Success response

- **Code**: 200

### Error response

- **Code**: 400 OR 401 OR 403 OR 409 OR 422

## <a name='GetCategory'></a> Get category

Retrieves the specified category.

| Title         | Retrieve a category |
| ------------- | ------------------- |
| URL           | /categories/:id     |
| Method        | GET                 |
| Authorization | admin               |

### Params

| Parameter | type    | Required? |
| --------- | ------- | --------- |
| id        | integer | Yes       |

### Success response

- **Code**: 200

### Error response

- **Code**: 400 OR 401 OR 403 OR 409 OR 422

## <a name='GetCategories'></a> Get categories

Retrieves all categories.

| Title  | Retrieves categories |
| ------ | -------------------- |
| URL    | /categories          |
| Method | GET                  |

### Query

| Parameter | type | Required? |
| --------- | ---- | --------- |
| -         | -    | -         |

### Success response

- **Code**: 200

### Error response

- **Code**: 400 OR 422

[Back to top](#top)

## <a name='CreateProduct'></a> Create product

Creates a new product and responds with product contents if successfully created. Only authorized by admins or editors.

| Title         | Create a product |
| ------------- | ---------------- |
| URL           | /products        |
| Method        | POST             |
| Authorization | editor or admin  |

### Body

| Parameter   | type         | Required? |
| ----------- | ------------ | --------- |
| title       | string       | Yes       |
| description | string       | No        |
| price       | decimal      | Yes       |
| inventory   | integer      | Yes       |
| image       | image uplaod | No        |
| inventory   | integer      | Yes       |
| statusId    | integer      | No        |
| categoryId  | integer      | No        |

- statusId: References the product status (active or draft). By default, database populates draft with id of 1 and active with id of 2.
- categoryId: References an existing category.
- image: Can upload image of the product if in the correct format: JPEG or PNG.

### Success response

- **Code**: 201

### Error response

- **Code**: 400 OR 401 OR 403 OR 409 OR 422

## <a name='UpdateProduct'></a> Update category

Updates a category and responds with category contents if category was successfully updated. Can only be updated by users with **admin** role.

| Title         | Update a product |
| ------------- | ---------------- |
| URL           | /products        |
| Method        | PATCH            |
| Authorization | editor or admin  |

### Body

| Parameter   | type         | Required? |
| ----------- | ------------ | --------- |
| title       | string       | No        |
| description | string       | No        |
| price       | decimal      | No        |
| inventory   | integer      | No        |
| image       | image uplaod | No        |
| inventory   | integer      | No        |
| statusId    | integer      | No        |
| categoryId  | integer      | No        |

### Success response

- **Code**: 200

### Error response

- **Code**: 400 OR 401 OR 403 OR 409 OR 422

## <a name='GetProduct'></a> Get product

Retrieves the specified product.

| Title  | Retrieve a product |
| ------ | ------------------ |
| URL    | /products/:id      |
| Method | GET                |

### Params

| Parameter | type    | Required? |
| --------- | ------- | --------- |
| id        | integer | Yes       |

### Success response

- **Code**: 200

### Error response

- **Code**: 400 OR 422

## <a name='GetProducts'></a> Get products

Retrieves all products.

| Title  | Retrieves products |
| ------ | ------------------ |
| URL    | /products          |
| Method | GET                |

### Query

| Parameter | type | Required? |
| --------- | ---- | --------- |
| -         | -    | -         |

### Success response

- **Code**: 200

### Error response

- **Code**: 400 OR 422
