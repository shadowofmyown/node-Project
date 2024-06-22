const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const app = express();
const Order = require("./models/orders");
const OrderItem = require("./models/order-item");

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

app.use((req, res, next) => {
  User.findByPk(3).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
//both the line below establishing the ralation between both the table
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  // it's task to overide the table.
  .sync()
  .then((result) => {
    return User.findByPk(3);
    // app.listen(3000);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    console.log("myuser", user);
    return user;
  })
  .then((user) => {
    console.log("mycart", user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// (async () => {
//   try {
//     const user = await User.findByPk(1);
//     console.log("myuser", user);
//     if (!user) {
//       const newuser = await User.create({
//         name: "Max",
//         email: "test@test.com",
//       });
//       console.log("newuser", newuser);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();
//Yes, Sequelize is considered an easy and efficient way to work with databases, especially within the Node.js ecosystem
// sequelize.sync() is used to synchronize your Sequelize models with the database schema by creating a table
// app.listen(3000);
// console.log("adminishant", app.listen(3000));
