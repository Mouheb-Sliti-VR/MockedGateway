require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { processJsonRouteHandler } = require('./controllers/jsonHandler.js');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Setup database models after connecting to MongoDB
    require('./models/Account');

    // Setup the routes after connecting to MongoDB
    const authenticationRoutes = require('./routes/AuthentificationRoute');
    app.use('/auth', authenticationRoutes); // Use the authentication routes with base path /auth
    const purchaseRoutes = require('./routes/purchaseRoute.js');
    app.use(purchaseRoutes);

    // Route for processing JSON data
    app.get('/processJson', processJsonRouteHandler);
    app.get("/health-check", (req, res) => {
      res.status(200).send("up");
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
