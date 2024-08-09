import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from "@prisma/client";
import config from './config';
import { NotFoundError } from './errors/not-found-error';

const prisma = new PrismaClient();


passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile: any, done: Function) => {
            try {
                if (!profile.emails || profile.emails.length === 0) {
                    return done(new NotFoundError(), undefined);
                }

                const email = profile.emails[0].value;
                let user = await prisma.user.findUnique({ where: { googleId: profile.id } });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            googleId: profile.id,
                            email: email,
                            firstName: profile.displayName
                        }
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, undefined);
            }
        }
    )
);


passport.serializeUser((user: any, done: Function) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done: Function) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
