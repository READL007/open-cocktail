require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./src/config/database');
const cocktailRoutes = require('./src/routes/cocktails');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/cocktails', cocktailRoutes);

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synced');
  app.listen(PORT, () => console.log(`🍹 Server running on http://localhost:${PORT}`));
}).catch(err => console.error('DB Error:', err));