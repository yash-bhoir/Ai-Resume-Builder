import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../../prisma/index.js";

const addProduct = asyncHandler(async (req, res) => {
  const { productName, productCategory, imageofProduct, description, productPrice, stock, userId } = req.body;

  if ([productName, productCategory, description, productPrice, stock, userId].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields except imageofProduct are required.");
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        productName,
        productCategory,
        imageofProduct,
        description,
        productPrice: parseFloat(productPrice),
        stock: parseInt(stock, 10),
        userId, 
      },
    });

    return res.status(201).json(new ApiResponse(201, newProduct, "Product added successfully"));
  } catch (error) {
    console.error("Error adding product:", error);
    throw new ApiError(500, "An error occurred while adding the product.");
  }
});


const deleteProduct = asyncHandler(async (req, res) => {
  // Log the entire request body for debugging
  console.log("Request Body:", req.body);

  // Correctly extract `id` from `req.body`
    const { id } = req.body;

  if (!id) {
    throw new ApiError(400, "Product ID is required.");
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id, // No need to parseInt, since ID should be a string in this case
      },
    });

    return res.status(200).json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new ApiError(500, "An error occurred while deleting the product.");
  }
});


const editProduct = asyncHandler(async (req, res) => {
  const { id, productName, productCategory, imageofProduct, description, productPrice, stock } = req.body;

  if (!id) {
    throw new ApiError(400, "Product ID is required.");
  }

  if ([productName, productCategory, description, productPrice, stock].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields except imageofProduct are required.");
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: id, 
      },
      data: {
        productName,
        productCategory,
        imageofProduct,
        description,
        productPrice: parseFloat(productPrice),
        stock: parseInt(stock, 10),
      },
    });

    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
  } catch (error) {
    console.error("Error updating product:", error);
    throw new ApiError(500, "An error occurred while updating the product.");
  }
});


const getProductsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required.");
  }

  try {
    const userProducts = await prisma.product.findMany({
      where: {
        userId: userId,
      },
    });

    if (!userProducts.length) {
      throw new ApiError(404, "No products found for this user.");
    }

    return res.status(200).json(new ApiResponse(200, userProducts, "Products fetched successfully"));
  } catch (error) {
    console.error("Error fetching user products:", error);
    throw new ApiError(500, "An error occurred while fetching the products.");
  }
});


export { addProduct, deleteProduct, editProduct, getProductsByUser };
