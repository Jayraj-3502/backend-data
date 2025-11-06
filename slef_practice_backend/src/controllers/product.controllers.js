import { Product } from "../models/product.models.js";

export async function getAllProductDetails(req, res) {
  try {
    const allProducts = await Product.find();
    res.status(201).send({ Message: "Products Found", Products: allProducts });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function createNewProduct(req, res) {
  try {
    const { name, description, brand, price, color = "", stock } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      brand,
      price,
      color,
      stock,
    });
    res.status(201).send({ Message: "Product is createad", Data: newProduct });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function deleteProductById(req, res) {
  try {
    const productExist = await Product.findByIdAndDelete(req.params.id);
    if (!productExist) {
      return res.status(404).send({ Message: "Product Not Found" });
    }

    res.status(201).send({ Message: "Product Deleted", Product: productExist });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function updateProductById(req, res) {
  try {
    console.log("This is running");
    const userExist = await Product.findById(req.params.id);
    if (!userExist) {
      return res.status(404).send({ Message: "User not found" });
    }

    const updatedUser = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      Message: "Product updated successfully",
      Data: updatedUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function getProductById(req, res) {
  try {
    const productExist = await Product.findById(req.params.id);
    if (!productExist) {
      return res.status(404).send({ Message: "Product Not Found" });
    }
    res.status(201).send({ Message: "Product Found", Product: productExist });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}
