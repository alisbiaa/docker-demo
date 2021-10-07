const express = require("express")
const mongoose = require("mongoose");
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, PORT, REDIS_PORT} = require("./config/config");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    port : REDIS_PORT,
})


const app = express();
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

app.use(cors);
app.use(express.json());

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL)
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

app.enable("trust proxy");
app.use(session({
    store: new RedisStore({
        client:redisClient
    }),
    secret : SESSION_SECRET,
    cookie : {
        secure : false,
        resave : false,
        saveUninitialized: false,
        httpOnly : true,
        maxAge : 30000
    }
}));
app.get("/api", ((req, res) => {
        res.send("As boaatiful");
    }
));
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
