const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();

// Init middleware for body parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/profile_me', require('./routes/api/profile_me'));
app.use('/api/profile_experience', require('./routes/api/profile_experience'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
