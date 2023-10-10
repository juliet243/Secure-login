require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https')
const fs = require('fs');
const cors = require('cors');
const hsts = require('./middleware/hsts')
const mongoose = require('mongoose');


//const certificate = fs.readFileSync('keys/certificate.pem')

//Database
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Db Connected :)'))

//Middleware
app.use(cors({origin: 'https://localhost:3000', optionsSuccessStatus:200}))
app.use(express.json());
app.use(hsts);

//Routers
app.use('/api/auth', require("./routes/auth"));
app.use('/api/user', require("./routes/user"));
app.use('/api/post', require("./routes/post"));


app.use((reg,res,next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,ContentType,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();

});


//listen
https.createServer(
    {
        key: fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem'),
        passphrase:'friedgreentomatoes',
    },
    app
).listen(3000);










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
