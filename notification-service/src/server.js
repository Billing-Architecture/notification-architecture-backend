require('dotenv').config();
const app = require('./app');
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();