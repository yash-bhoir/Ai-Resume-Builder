import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import prisma from '../../prisma/index.js';

// Add Category
const addCategory = asyncHandler(async (req, res) => {
  const { categoryName, userId } = req.body;
  console.log(req.body)

  if (!categoryName || !categoryName.trim()) {
    throw new ApiError(400, "categoryName is required.");
  }

  if (!userId || !userId.trim()) {
    throw new ApiError(400, "userId is required.");
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        categoryName,
        userId
      }
    });

    return res.status(201).json(new ApiResponse(201, newCategory, "Category added successfully"));
  } catch (error) {
    console.error("Error adding category:", error);
    throw new ApiError(500, "An error occurred while adding the category.");
  }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id || !id.trim()) {
    throw new ApiError(400, "id is required.");
  }

  try {
    const deletedCategory = await prisma.category.delete({
      where: { id }
    });

    return res.status(200).json(new ApiResponse(200, deletedCategory, "Category deleted successfully"));
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new ApiError(500, "An error occurred while deleting the category.");
  }
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  const { id, categoryName } = req.body;

  if (!id || !id.trim()) {
    throw new ApiError(400, "id is required.");
  }

  if (!categoryName || !categoryName.trim()) {
    throw new ApiError(400, "categoryName is required.");
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { categoryName }
    });

    return res.status(200).json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
  } catch (error) {
    console.error("Error updating category:", error);
    throw new ApiError(500, "An error occurred while updating the category.");
  }
});

const getCategoryByUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required.");
  }

  try {
    const userProducts = await prisma.Category.findMany({
      where: {
        userId: userId,
      },
    });

    if (!userProducts.length) {
      throw new ApiError(404, "No Category found for this user.");
    }

    return res.status(200).json(new ApiResponse(200, userProducts, "Category fetched successfully"));
  } catch (error) {
    console.error("Error fetching user Category:", error);
    throw new ApiError(500, "An error occurred while fetching the Category.");
  }
});

export { addCategory, deleteCategory, updateCategory ,getCategoryByUser };
