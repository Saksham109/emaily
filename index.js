
const express=require('express');

const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/keys');

require('./models/Users');


require('./services/passport');
//because we just need to execute passport.js

//mongodb pass bWToWMx9mJua3yll
const app=express();

mongoose.connect(keys.mongoURI);

app.use(
    cookieSession({
          maxAge: 30*24*60*60*1000,
          keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT=process.env.PORT || 5000;

app.listen(PORT);
