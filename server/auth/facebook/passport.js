import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';


export function setup(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {

    if(!req.query.state){
      console.log('LOGIN o REGISTRAZIONE');

      User.findOneAsync({'facebook.id': profile.id})
          .then(user => {
            if (user) {
              return done(null, user);
            }
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: 'user',
              provider: 'facebook',
              facebook: profile._json
            });
            user.saveAsync()
              .then(user => done(null, user))
              .catch(err => done(err));
          })
          .catch(err => done(err));

    } else {
      console.log('CONNECT');

      var user = JSON.parse(req.query.state);

      User.findById(user._id)
          .then(function(user) { //then here do what you want! :)
            if (!user) {
              console.log('UTENTE IN SESSION NON TROVATO');
            } else {
              user.facebook = profile._json;
              user.saveAsync()
                .then(user => done(null, user))
                .catch(err => done(err));
            }
          })
    }
  }));
}
