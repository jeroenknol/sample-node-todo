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

    // findOneAndUpdate
    db.collection('Todos')
      .findOneAndUpdate(
        { title: 'eat lunch' },
        {
          $set: {
            completed: true,
          },
        },
        { returnOriginal: false }
      )
      .then(res => console.log(res));

    db.collection('Users')
      .findOneAndUpdate(
        { _id: new ObjectID('5c390d335a09532fa1a9ff21') },
        {
          $set: {
            name: 'Jeroen',
          },
          $inc: {
            age: 1,
          },
        },
        { returnOriginal: false }
      )
      .then(res => console.log(res));

    client.close();
  }
);
