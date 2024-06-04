// // const fs = require("fs");
// // const path = require("path");
// const db = require("../util/database");
// const Cart = require("./cart");
// const { deleteProduct } = require("../controllers/admin");

// // const getProductsFromFile = (cb) => {
// //   const p = path.join(
// //     path.dirname(require.main.filename),
// //     "data",
// //     "products.json"
// //   );
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       return cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };
// module.exports = class product {
//   constructor(id, tittle, imageUrl, price, description) {
//     this.id = id; //this will point to the current instance of the class
//     this.title = tittle;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }
//   static fetchAll() {
//     return db.execute("SELECT * FROM sys.products");
//   }
//   static deleteProductById(id) {}
//   static findByID(id) {}
// };

const Sequelize = require("sequelize"); // Import Sequelize

const sequelize = require("../util/database"); // Import the sequelize instance

// Define the Product model
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    // Corrected field name
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product; // Export the Product model
