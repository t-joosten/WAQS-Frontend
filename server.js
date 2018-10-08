//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/waterquality-frontend'));

app.get('*', (req, res) => {
  res.sendFile(`./waterquality-frontend/dist/index.html`);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
