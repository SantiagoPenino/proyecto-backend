// crear carrito
// buscar carrito por id
// agregar producto a carrito

import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  //crear carrito
});

router.get("/:cid", async (req, res) => {
  const { id } = req.params;
  //buscar carrito por id
});

router.post("/:idCart/products/:idProd", async (req, res) => {
  const { idProd, idCart } = req.params;
  //llamar metodo que busca cart por id
  //llamar metodo que busca prod por id
  //si el producto existe, llaman al metodo que guarda el prod en el cart (el cart previamente creado)
  await CartManager.addProductToCart(idCart, idProd);
});
