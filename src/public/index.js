addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("newProduct", (product) => {
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;
    document.body.appendChild(productTitle);
  });
});
