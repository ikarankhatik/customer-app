import passport from "passport";
import passportJWT, { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

interface JwtPayload {
  id: string;
}



const opts: passportJWT.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY || "", // Replace with your secret key
};

// JWT authentication
passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    console.log(jwt_payload.id, "pergopirjoghrthorthorthobrotbeoreoboerbore");
    
  })
);

// Local authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      
    }
  )
);



export default passport;
