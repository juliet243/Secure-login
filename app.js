require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the 'cors' middleware

// Database
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Db Connected :)'));

// Middleware
app.use(cors({ origin: 'https://localhost:4200', credentials: true })); // Configure the 'cors' middleware with the desired options
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

// Enable CORS headers in your app
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://localhost:4200'); // Replace with your Angular app's URL
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true'); // Add this line to allow credentials
    next();
});

// Listen
https.createServer(
    {
        key: fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem'),
        passphrase: 'friedgreentomatoes',
    },
    app
).listen(3000, () => {
    console.log('Server is running on port 3000');
});











/*//Node.js code
const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Fruit = require('./models/fruit')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem')
const options = {
    server: { sslCA: cert }
};

const connstring = 'mongodb+srv://st10082143:Giftonly89@cluster0.uvdoy8a.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connstring)
.then(() =>
{
    console.log('Connected :)')
})
.catch(() =>
{
    console.log('Not connected :(')
}, options);

app.use(express.json())

app.get(urlprefix+'/', (req, res)=>{
    res.send('Hello World')
})



//{ = object
//[ = array

app.get(urlprefix+'/fruits',(req,res)=>{
   /* const orders = [
        {
            id: "1",
            name: "Orange"
        },
        {
            id: "2",
            name: "Banana"
        },
        {
            id: "3",
            name: "Pear"
        }
    ]
    res.json(
        {
            message: "Fruits",
            orders: orders
        }
    )
    */
/*
    //To find out fruit
    Fruit.find().then((fruits)=> {
        res.json(
            {
                message: 'Fruits found',
                fruits: fruits
            }
        )
    }
    )
})

app.post(urlprefix+'/fruits', (req,res) => {
    const fruit = new Fruit (
        {
            id: req.body.id,
            name: req.body.name
        }
    )
    fruit.save();
    res.status(201).json({
        message: 'Fruit created',
        fruit: fruit
    })
})

module.exports = app;
*/
