const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


require('dotenv').config();
const port = 5055;


app.use(cors());
app.use(bodyParser.json());

//Database Connection:


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1vrnz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const serviceCollection = client.db("fixoria").collection("availableServices");
    const reviewCollection = client.db("fixoria").collection("reviews");
    const ordersCollection = client.db("fixoria").collection("orders");
    const AdminCollection = client.db("fixoria").collection("Admins");
    const subscriberCollection = client.db("fixoria").collection("subscriberCollection");




    app.post('/addService', (req, res) => {
        const newService = req.body;
        console.log('adding new service: ', newService)
        serviceCollection.insertOne(newService)
            .then(result => {
                console.log('inserted count', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    })
    app.post('/addReview', (req, res) => {
        const newReview = req.body;
        console.log('adding new review: ', newReview)
        reviewCollection.insertOne(newReview)
            .then(result => {
                console.log('inserted count', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    })
    app.post('/subscribe', (req, res) => {
        const newSubscriber = req.body;
        console.log('adding new review: ', newSubscriber)
        subscriberCollection.insertOne(newSubscriber)
            .then(result => {
                console.log('inserted count', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    })
    app.post('/addAdmin', (req, res) => {
        const newAdmin = req.body;
        console.log('adding new Admin: ', newAdmin)
        AdminCollection.insertOne(newAdmin)
            .then(result => {
                console.log('inserted count', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    })
    app.get('/services', (req, res) => {
        serviceCollection.find()
            .toArray((err, items) => {
                res.send(items)
            })
    })
    app.get('/reviews', (req, res) => {
        reviewCollection.find()
            .toArray((err, items) => {
                res.send(items)
            })
    })
    app.get('/admin', (req, res) => {
        AdminCollection.find()
            .toArray((err, items) => {
                res.send(items)
            })
    })
    app.post('/pay', (req, res) => {
        const newCheckOut = req.body;
        console.log('adding new service: ', newCheckOut)
        ordersCollection.insertOne(newCheckOut)
            .then(result => {
                console.log('inserted count', result.insertedCount)
                res.send(result.insertedCount > 0)
                console.log("added")
            })
    })

    app.get('/orders', (req, res) => {
        ordersCollection.find()
            .toArray((err, items) => {
                res.send(items)
                console.log('from database', items)
            })
    })
    // app.get('/orders', (req, res) => {
    //     orderCollection.find()
    //         .toArray((err, items) => {
    //             res.send(items)
    //             console.log('from database', items)
    //         })
    // })

    // app.post('/checkout', (req, res) => {
    //     const newCheckOut = req.body;
    //     console.log('adding new product: ', newCheckOut)
    //     orderCollection.insertOne(newCheckOut)
    //         .then(result => {
    //             console.log('inserted count', result.insertedCount)
    //             res.send(result.insertedCount > 0)
    //             console.log("added")
    //         })
    // })



    // app.delete('/delete/:id', (req, res) => {
    //     productCollection.deleteOne({ _id: ObjectId(req.params.id) })
    //         .then(result => {
    //             res.send(result.deletedCount > 0)

    //         })
    // })
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

});







app.listen(process.env.PORT || port)