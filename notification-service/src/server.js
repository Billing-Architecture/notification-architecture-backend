const app = require('./app');
const express = require("express");
const sequelize = require("./config/database");
const CORS = require("cors");
require('dotenv').config();

app.use(CORS());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const notification_routes = require('./routes/notifications_route');
app.use('/api/notifications', notification_routes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server listen in port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error to start the server:", error);
  }
};

startServer();

module.exports = { app, sequelize };
