import passport from 'passport';
import {Strategy as WithingsStrategy} from 'passport-withings';

exports.setup = function (User, config) {
  passport.use(new WithingsStrategy({
      consumerKey: config.withings.clientID,
      consumerSecret: config.withings.clientSecret,
      callbackURL: config.withings.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      console.log('WITHINGS CALLBACK');
      console.log('USER IN SESSION:');
      console.log(req.user);
      console.log('- - - - - - - - - - - - - - - - -');

      if(req.user){
          // Logged in, add information to the user
          req.user.withings = {
            provider : profile.provider,
            id : profile.id,
            accessToken : accessToken,
            refreshToken : refreshToken,
          }

          req.user.saveAsync()
            .then(function(user) {
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });

      } else {        // Not logged in, i look for the user or i create one
        User.findOne({
          'withings.id': profile.id
        },
        function(err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            console.log(profile);

            user = new User({
              role: 'user',
              username: profile.username,
              provider: 'withings',
            });

            user.saveAsync()
              .then(function(user) {
                return done(null, user);
              })
              .catch(function(err) {
                return done(err);
              });

          } else {
            return done(err, user);
          }
        })

      }
    }
  ));
};
