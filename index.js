const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Survey');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());



app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
  })
);

app.use(passport.initialize());
app.use(passport.session()); 


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
  
const PORT = process.env.PORT || 5000;
app.listen(PORT);
