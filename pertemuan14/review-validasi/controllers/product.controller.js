import { getAllProduct } from "../models/product.model.js";

const getProduct = async (req, res) => {
  try {
    const result = await getAllProduct();
    return res.status(200).json({
      success: true,
      message: "Data product",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { getProduct };
