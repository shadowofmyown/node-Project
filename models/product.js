const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const { deleteProduct } = require("../controllers/admin");

const getProductsFromFile = (cb) => {
  const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json"
  );
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class product {
  constructor(id, tittle, imageUrl, price, description) {
    this.id = id; //this will point to the current instance of the class
    this.title = tittle;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const p = path.join(
          path.dirname(require.main.filename),
          "data",
          "products.json"
        );
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        const p = path.join(
          path.dirname(require.main.filename),
          "data",
          "products.json"
        );
        console.log("prodnishant", JSON.stringify(products));
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static deleteProductById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      const p = path.join(
        path.dirname(require.main.filename),
        "data",
        "products.json"
      );
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
  static findByID(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
