const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3001;

app.use(cors());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Helps prevent XSS
      sameSite: 'strict' // Adjust as needed ('lax' or 'none' for cross-site cookies)
    }
}));

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

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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

const questionSchema = new mongoose.Schema({
    questionId: String,
    questionText: String,
});

const Question = mongoose.model('Question', questionSchema);

app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
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

async function addQuestionToDatabase(question) {
    try {
        const collection = db2.collection('Questions');
        const result = await collection.insertOne(question);
        console.log('Inserted document ID:', result.insertedId);
        return { ...question, _id: result.insertedId };
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
        const user = await db2.collection('Questions').findOne({ 'questionId': id });
        const result = await collection.deleteOne({ _id: user._id });
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
app.delete('/api/parties/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = db2.collection('parties');
        const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Party deleted successfully' });
        } else {
            res.status(404).json({ message: 'Party not found' });
        }
    } catch (error) {
        console.error('Error deleting party:', error);
        res.status(500).json({ error: 'Failed to delete party' });
    }
});

// POST endpoint to save a new party and its answers
app.post('/api/parties', async (req, res) => {
    try {
        const { party_name, Answers } = req.body;
        const collection = db2.collection('parties');
        const newParty = {
            party_name,
            Answers
        };
        const result = await collection.insertOne(newParty);
        res.status(201).json({ ...newParty, _id: result.insertedId });
    } catch (error) {
        console.error('Error in POST /api/parties:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
