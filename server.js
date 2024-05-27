
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

const mongoUrl = 'mongodb+srv://kostas:ntomotsidis@cluster0.cojhzrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
const dbName = 'BelgiumMongoDbResults'
const dbName2= 'Questionaire'
let db;
let db2;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        db2 = client.db(dbName2) 
        console.log('Connected to Database');
    })
    .catch(error => console.error(error));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route to retrieve data from a collection
app.get('/api/collection', async (req, res) => {
    try {
        const collection = db.collection('BelgiumVotes'); 
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/questions', async (req, res) => {
    try {
        const collection = db2.collection('Questions'); 
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/parties', async (req, res) => {
    try {
        const collection = db2.collection('parties'); 
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
