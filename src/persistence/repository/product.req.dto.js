export default class ProductReqDTO {
  constructor(product) {
    this.name = product.productName;
    this.description = product.productDescription;
    this.price = product.productPrice;
    this.stock = product.productStock;
  }
}
