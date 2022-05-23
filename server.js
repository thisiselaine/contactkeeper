const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'welcome to the contactkeeper API' })
); // one way to send data; this is sending as json

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/off'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
