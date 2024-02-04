const passport=require('passport');

const GoogleStrategy=require('passport-google-oauth20').Strategy;

const keys=require('../config/keys');
const { default: mongoose } = require('mongoose');

const User=mongoose.model('users'); //here 1 argument means we fetch value from users 


//serialising user to entertain incoming requests using cookies

passport.serializeUser((user,done)=>{
  done(null,user.id);

});

//deserialising after fulfiling request

passport.deserializeUser((id,done)=>{

    User.findById(id).then(user=>{
     done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleID:profile.id}) //this returns promise, so we use .then
    .then((existingUser)=>{
        if(existingUser)
        {
            //already user exist, skip user creation
            done(null,existingUser); // first argument is error, which is null 
        }
        else
        {
            //new user, create it in database
            new User({ 
                googleID:profile.id
                }).save().then(user =>done(null,user));

        }


    })
   
}));