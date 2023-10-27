import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY || "", // Replace with your secret key
};
// JWT authentication
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload.id, "pergopirjoghrthorthorthobrotbeoreoboerbore");
}));
// Local authentication
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
}));
export default passport;
//# sourceMappingURL=jwtAuthentication.js.map