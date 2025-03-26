const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users')

passport.serializeUser((user, done) => { 
    done(null, user.id); // this is the id that is in the mongoDB
     
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', 
        proxy: true // this is to tell google that we are behind a proxy and to trust it
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleId: profile.id})
            if(existingUser){
                // we alredy have a record with this id  
                return done(null, existingUser); // this function purpose is to tell passport that it is finished google auth process we can see that it is passed as argument
            }
            // make a new one because this one dosent exist
            const user = await new User({googleId: profile.id}).save()
            done(null, user);   
        }
    )  
);

