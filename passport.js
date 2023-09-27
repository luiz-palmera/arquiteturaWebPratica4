import dotenv from 'dotenv';
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20';

dotenv.config()

passport.use(new Strategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:3001/auth/google/callback",
        passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});