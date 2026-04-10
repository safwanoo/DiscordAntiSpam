require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const moderationRoutes = require('./routes/moderationRoutes');
app.use('/', moderationRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});