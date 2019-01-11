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

    // deleteMany
    db.collection('Todos')
      .deleteMany({ title: 'eat lunch' })
      .then(res => {
        console.log(res);
      });

    // deleteOne
    db.collection('Todos')
      .deleteOne({ title: 'eat lunch' })
      .then(res => {
        console.log(res);
      });

    // findOneAndDelete
    db.collection('Todos')
      .findOneAndDelete({ title: 'eat lunch' })
      .then(res => {
        console.log(res);
      });

    // challenge

    db.collection('Users').deleteMany({ name: 'Jeroen' });

    db.collection('Users')
      .findOneAndDelete({ _id: new ObjectID('5c3912865a09532fa1aa0000') })
      .then(
        res => {
          console.log(JSON.stringify(res, null, 2));
        },
        err => console.log(err)
      );

    client.close();
  }
);
