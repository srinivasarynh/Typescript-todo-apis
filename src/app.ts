import express from 'express';
import 'express-async-errors';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import './passport-setup';

import config from './config';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { createTodoRouter } from './routes/createTodo';
import { showTodoRouter } from './routes/showTodo';
import { deleteTodoRouter } from './routes/deleteTodo';
import { updateTodoRouter } from './routes/updateTodo';

const app = express();
// app.set('trust proxy', true);

const allowedOrigins = [
    '*',
    'http://localhost:5173',
    'https://yourproductiondomain.com'
];
app.use(
    session({
        name: 'session',
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Enable cookies and HTTP authentication
}));


app.options('*', cors());
app.use(helmet());

if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(hpp());

app.use(compression());

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        res.redirect('http://localhost:3000/dashboard');
    }
);


app.use('/api/v1/users/signup', signupRouter);
app.use('/api/v1/users/signin', signinRouter);
app.use('/api/v1/users/signout', signoutRouter);
app.use('/api/v1/todo/create', createTodoRouter);
app.use('/api/v1/todo/show', showTodoRouter);
app.use('/api/v1/todo/delete', deleteTodoRouter);
app.use('/api/v1/todo/update', updateTodoRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;