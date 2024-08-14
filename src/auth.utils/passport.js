const prisma = require('@prisma/client');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { googleId: profile.id }
    });

    if (existingUser) {
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          displayName: profile.displayName,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          email: profile.email,
          emailVerified: profile.email_verified,
          photos: profile.photos[0]?.value,
        },
      });
      return done(null, updatedUser);
    } else {
      const newUser = await prisma.user.create({
        data: {
          googleId: profile.id,
          displayName: profile.displayName,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          email: profile.email,
          emailVerified: profile.email_verified,
          photos: profile.photos[0]?.value,
        },
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error, false);
  }
}));
