const { mapCategory, mapCategories } = require('../helpers/mappings')
const {
  addCategory,
  editCategory,
  removeCategory,
  getCategory,
  getCategories,
} = require('../models/category')

const ActionStatus = require('../types/ActionStatus')

async function createCategory(title) {
  try {
    const createdCategory = await addCategory(title)
    if (createdCategory) {
      return {
        action: ActionStatus.Created,
        data: { category: mapCategory(createdCategory) },
      }
    } else {
      return {
        action: ActionStatus.BadRequest,
        data: null,
      }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function updateCategory(id, title) {
  try {
    const updatedCategory = await editCategory(id, title)
    if (updatedCategory) {
      return {
        action: ActionStatus.Ok,
        data: { category: mapCategory(updatedCategory) },
      }
    } else {
      return {
        action: ActionStatus.BadRequest,
        data: null,
      }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function deleteCategory(id) {
  try {
    const selectedCategory = await removeCategory(id)
    if (selectedCategory) {
      return {
        action: ActionStatus.Ok,
        data: null,
      }
    } else {
      return {
        action: ActionStatus.BadRequest,
        data: null,
      }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function fetchCategory(id) {
  try {
    const selectedCategory = await getCategory(id)
    if (selectedCategory) {
      return {
        action: ActionStatus.Ok,
        data: { category: mapCategory(selectedCategory) },
      }
    } else {
      return {
        action: ActionStatus.BadRequest,
        data: null,
      }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function fetchCategories(page = 1) {
  try {
    const categories = await getCategories(page)
    if (categories) {
      return {
        action: ActionStatus.Ok,
        data: { categories: mapCategories(categories) },
      }
    } else {
      return {
        action: ActionStatus.BadRequest,
        data: null,
      }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,
  fetchCategories,
}
