import * as dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import { Server } from "socket.io";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { OSCONFIG } from './OSCONFIG.js';

dotenv.config()
const systemconfig = OSCONFIG()
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ optionsSuccessStatus: 200 }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    //     // Request methods you wish to allow
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //     // Request headers you wish to allow
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     res.setHeader('Access-Control-Allow-Credentials', true);
    //     // Pass to next layer of middleware
    //     next();
    // } else {
    //     res.status(403).send({ messaeg: 'access denied' })
    // }

    next();
});

app.get("/", (req, res) => {
    res.send("working")
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log("connect", socket.request._query.foo)
    socket.on("message", async (message) => {
        console.log("message", message)
    })

    socket.on('disconnect', async () => {
        console.log("disconnect")
    });
});

server.listen(process.env?.PORT, undefined, () => { // systemconfig['Wi-Fi']?.address || systemconfig['Loopback Pseudo-Interface 1']?.address
    console.log(`Server connected to http://localhost:${process.env?.PORT} http://${systemconfig['Wi-Fi']?.address || systemconfig['Loopback Pseudo-Interface 1']?.address}:${process.env?.PORT}`)
})