const express = require("express");
const app = express();
const server = require('http').createServer(app);
const mysql = require('mysql2');
const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const io = require('socket.io')(server, {
    cors: ["http://localhost:5173", "http://192.168.1.3:5173"]
})

io.on('connection', (socket) => {
    socket.on('clientCreated', data => {
        if (data) {
            connection.query('INSERT INTO client SET ?', data, (error, results, fields) => {
                if (error) {
                    console.log(error)
                }
                console.log(results)
            })
        }
    })

    socket.on('parthnerCreated', data => {

        if (data) {
            connection.query('INSERT INTO parthner SET ?', data, (error, results, fields) => {
                if (error) {
                    console.log(error)
                }
            })
        }

    })
    socket.on('fetchPartners', () => {
        connection.query('SELECT parthner_id, name FROM parthner', (error, results, fields) => {
            socket.emit('fetchedPartners', results)
        })
    })
    socket.on('fetchData', () => {
        connection.query('SELECT client.*, parthner.name AS partner_name FROM client LEFT JOIN parthner ON client.parthner_id = parthner.parthner_id', (error, results, fields) => {
            socket.emit('fetchedData', results)
        })
    })
})


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'license',
    connectionLimit: 10,
});


app.use(bodyParser.json())
app.use(express.json())



app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.1.3:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));


function verifyToken(req, res, next) {
    const token = req.body.token
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false });
        }
        return res.status(200).json({ valid: true });
    });
}

function generateToken(email) {
    const payload = {
        email: email,
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, 'your-secret-key', options);
}

app.post('/api/auth/verify', verifyToken, (req, res) => {

})


app.post('/api/auth/', (req, res) => {
    const sql = "SELECT * FROM auth WHERE email = ? AND password = ?";
    let { email, password } = req.body
    connection.query(sql, [email, password], (error, results, fields) => {
        if (error) { res.send({ message: 'There was a problem with an authentication. Please contact administrator' }) }
        if (results && results.length > 0) {

            let token = generateToken(results[0].email)
            res.status(200).json({ token: token })

        } else {
            res.status(404).json({ message: 'Invalid Credentials. Please try again.' })

        }
    })
})

setInterval(function () {
    connection.query('SELECT 1');
}, 10000);

server.listen(5000, () => {
    console.log("Listening on port 5000")
})
