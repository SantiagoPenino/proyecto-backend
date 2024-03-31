export default class ProductResDTO {
  constructor(product) {
    (this.name = product.productName), (this.price = product.productPrice);
  }
}
