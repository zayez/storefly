const { mapCategory, mapCategories } = require('../helpers/mappings')
const Category = require('../models/category')
const ActionStatus = require('../types/ActionStatus')

async function createCategory(category) {
  try {
    const createdCategory = await Category.create(category)
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

async function updateCategory(id, category) {
  try {
    const updatedCategory = await Category.update(id, category)
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
    const selectedCategory = await Category.destroy(id)
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
    const selectedCategory = await Category.findById(id)
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
    const categories = await Category.findAll(page)
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
