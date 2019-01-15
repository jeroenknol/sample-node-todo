const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5c3d8545a4c98322301ecccb';

if (!ObjectID.isValid(id)) {
  console.log('Not a valid ID');
}

// Todo.find({ _id: id }).then(todos => {
//   console.log(todos);
// });

// Todo.findOne({ _id: id }).then(todo => {
//   console.log(todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Todo not found');
//     }

//     console.log(todo);
//   })
//   .catch(e => console.log(e));

const userID = '5c3b7bfe7d0ff31363021221';

if (!ObjectID.isValid(userID)) {
  console.log('Invalid ID');
}

User.findById(userID)
  .then(user => {
    if (!user) {
      return console.log('User not found');
    }

    console.log(user);
  })
  .catch(e => console.log(e));
