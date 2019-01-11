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

    // db.collection('Todos')
    //   .find({ _id: new ObjectID('5c389b02d2ee871c397afbba') })
    //   .toArray()
    //   .then(
    //     res => {
    //       // res.map(item => console.log(item));
    //       console.log(JSON.stringify(res, null, 2));
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

    // db.collection('Todos')
    //   .find()
    //   .count()
    //   .then(
    //     count => {
    //       console.log(`Todos count: ${count}`);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

    db.collection('Users')
      .find({ age: 26 })
      .toArray()
      .then(res => console.log(res), err => console.log(err));

    client.close();
  }
);
