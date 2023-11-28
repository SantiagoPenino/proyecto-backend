import * as service from "../services/productsService.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) res.status(400).json({ error: "Product not found" });
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProduct = await service.create(req.body);
    if (!newProduct) res.status(400).json({ error: "Product not created" });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await service.update(id, req.body);
    if (!updatedProduct) res.status(404).json({ error: "Product not updated" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.remove(id);
    if (!deletedProduct) res.status(404).json({ error: "Product not deleted" });
    res.status(200).json({ Success: `Product ${id} deleted` });
  } catch (error) {
    next(error.message);
  }
};
