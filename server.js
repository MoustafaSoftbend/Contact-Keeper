const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, './client/build')))

    app.get('*', function(_, res) {
      res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));