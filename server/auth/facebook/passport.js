import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails'
    ],
    session: true,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // console.log('FACEBOOK CALLBACK');
    // console.log('USER IN SESSION:');
    // console.log(req.user);
    // console.log('- - - - - - - - - - - - - - - - -');

    if(req.user){

      // Logged in, add information to the user
      req.user.facebook = profile._json;

      req.user.saveAsync()
        .then(function(user) {
          return done(null, user);
        })
        .catch(function(err) {
          return done(err);
        });

    } else{
        User.findOneAsync({
          'facebook.id': profile.id
        })
        .then(function(user) {
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              provider: 'facebook',
              facebook: profile._json
            });
            user.saveAsync()
              .then(function(user) {
                return done(null, user);
              })
              .catch(function(err) {
                return done(err);
              });
          } else {
            return done(null, user);
          }
        })
        .catch(function(err) {
          return done(err);
        });
    }

  }));
}
