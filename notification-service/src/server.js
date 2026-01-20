require('dotenv').config();

const express = require("express");
const CORS = require("cors");
const sequelize = require("./config/database");
const app = require('./app');

app.use(CORS());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const notification_routes = require('./routes/notifications_route');
app.use('/api/notify', notification_routes);

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
