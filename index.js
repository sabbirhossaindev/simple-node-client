const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('simple node server Running');
});

// username: dbuser1
// password: Ch8kmsuQRluwawBk

app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },
];


const uri = "mongodb+srv://dbuser1:Ch8kmsuQRluwawBk@cluster0.ok9cief.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const userCollection = client.db('simpleNode').collection('users');
        // const user = {name: 'Nahiya Mahi', email: 'nehi@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get( '/users', async (req, res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally{

    }
}

run().catch(err =>console.log(err))


// app.get('/users', (req, res) => {
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
    
// });

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req, res) => {
    console.log(['post api called']);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    req.send(user);
})

app.listen(port, () => {
    console.log(`simple node server running on port ${port}`);
});