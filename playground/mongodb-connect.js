const { MongoClient, ObjectID } = require('mongodb');

const objID = new ObjectID();
console.log(`Generated ID: ${objID}`);

MongoClient.connect(
  'mongodb://localhost:27017/TodoApi',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log(err);
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApi');

    // db.collection('Todos').insertOne(
    //   {
    //     title: 'Something to do',
    //     completed: false,
    //   },
    //   (err, res) => {
    //     if (err) {
    //       return console.log(err);
    //     }

    //     console.log(JSON.stringify(res.ops, null, 2));
    //   }
    // );

    // db.collection('Users').insertOne(
    //   {
    //     name: 'Jeroen',
    //     age: 26,
    //     location: 'Arnhem',
    //   },
    //   (err, res) => {
    //     if (err) {
    //       console.log(err);
    //     }

    //     console.log(JSON.stringify(res.ops, null, 2));
    //   }
    // );

    client.close();
  }
);
