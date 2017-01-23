import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import makeId from 'uuid-v4';

const user = {
    id: makeId(),
    username: 'matthewmarcos94'
};

passport.use(
    new LocalStrategy((username, password, cb) => {
        cb(null, user);
    })
);


export default passport;
