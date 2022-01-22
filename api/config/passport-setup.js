import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/users.js';

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser((_id, done) => {
  console.log('DeserializeUser called');
  console.log('deserializeUser', _id);
  User.findById(_id, (err, user) => {
    done(err, user);
  });
});

// TODO: import bcrypt from 'bcryptjs';

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: false,
    },
    (username, password, done) => {
      User.findOne({ username })
        .then((user) => {
          if (!user) {
            const newUser = new User({ username, password });
            newUser
              .save()
              .then((user) => {
                console.log('Пользователь зарегистрирован');
                return done(null, user);
              })
              .catch((err) => {
                console.log('catch');
                return done(null, false, { message: err });
              });
          } else {
            if (user.password === password) {
              console.log('Пользователь выполнил вход');
              return done(null, user);
            } else {
              console.log('Неправильно введен пароль!');
              return done(null, false, req.flash('msg', ['Ошибка', ': Неправильно введен пароль']));
            }
          }
        })
        .catch((err) => {
          return done(null, false, { message: err });
        });
    }
  )
);

export default passport;
