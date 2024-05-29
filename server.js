const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

const mongoUrl = 'mongodb+srv://kostas:ntomotsidis@cluster0.cojhzrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
const dbName = 'BelgiumMongoDbResults';
const dbName2 = 'Questionaire';
let db;
let db2;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        db2 = client.db(dbName2);
        console.log('Connected to Database');
    })
    .catch(error => console.error('Error connecting to database:', error));

// Serve static files from the current directory
app.use(express.static(__dirname));

app.use(express.json());

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
        console.error('Error retrieving collection data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/questions', async (req, res) => {
    try {
        const collection = db2.collection('Questions'); 
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving questions:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/parties', async (req, res) => {
    try {
        const collection = db2.collection('parties'); 
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving parties:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/admin', async (req, res) => {
    try {
        const collection = db2.collection('Admin'); 
        const data = await collection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving admin data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Function to add a question to the database
async function addQuestionToDatabase(question) {
    try {
        const collection = db2.collection('Questions');
        const result = await collection.insertOne(question);
        console.log('Inserted document ID:', result.insertedId);
        return { ...question, _id: result.insertedId }; // Return the new question with the inserted ID
    } catch (error) {
        console.error('Error adding question to the database:', error);
        throw new Error('Failed to add question to the database');
    }
}

app.post('/api/questions', async (req, res) => {
    try {
        const { questionId, question } = req.body;
        const newQuestion = await addQuestionToDatabase({ questionId, question });
        res.json(newQuestion);
    } catch (error) {
        console.error('Error in POST /api/questions:', error);
        res.status(500).json({ error: error.message });
    }
});
app.delete('/api/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = db2.collection('Questions');
        var user = await db2.collection('Questions').findOne({'questionId':id})
        console.log('userrrrr')
        console.log(user._id)
        console.log(user)

        const result = await collection.deleteOne({ _id: user._id});
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Question deleted successfully' });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Failed to delete question' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
