const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// db.execute("SELECT * FROM sys.products")
//   .then((result) => {
//     console.log(result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//both the line below establishing the ralation between both the table
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
sequelize
  //.sync({ force: true })it's task to overide the table.
  .sync()
  .then((result) => {
    console.log(result);
    // app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
//Yes, Sequelize is considered an easy and efficient way to work with databases, especially within the Node.js ecosystem
// sequelize.sync() is used to synchronize your Sequelize models with the database schema by creating a table
app.listen(3000);
// console.log("adminishant", app.listen(3000));
