const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const seedTodos = [
  {
    _id: new ObjectID(),
    title: 'First dummy todo',
  },
  {
    _id: new ObjectID(),
    title: 'Second dummy todo',
  },
  {
    _id: new ObjectID(),
    title: 'Third dummy todo',
    completed: true,
    completedAt: 123,
  },
];

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => Todo.insertMany(seedTodos))
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo item', done => {
    const title = 'Test todo item';

    request(app)
      .post('/todos')
      .send({ title })
      .expect(200)
      .expect(res => {
        expect(res.body.title).toBe(title);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ title })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].title).toBe(title);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create a todo item when no title was passed', done => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(3);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should retrieve all the todos in the database', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    const idString = seedTodos[1]._id.toHexString();
    request(app)
      .get(`/todos/${idString}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.title).toBe(seedTodos[1].title);
      })
      .end(done);
  });

  it('should send a 404 back if todo not found', done => {
    const idString = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${idString}`)
      .expect(404)
      .end(done);
  });

  it('should send a 404 when id is not valid', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', done => {
    const idString = seedTodos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${idString}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(idString);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(idString)
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should send a 404 if the todo was not found', done => {
    const idString = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${idString}`)
      .expect(404)
      .end(done);
  });

  it('should send a 404 if the id is not valid', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should toggle an incomplete todo to complete', done => {
    const idString = seedTodos[1]._id.toHexString();
    const testString = 'TestString123';
    request(app)
      .patch(`/todos/${idString}`)
      .send({ title: testString, completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.title).toBe(testString);
        expect(res.body.todo.completed).toBeTruthy();
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should toggle a complete todo to incomplete', done => {
    const idString = seedTodos[2]._id.toHexString();
    const testString = 'TestStr!ng234';
    request(app)
      .patch(`/todos/${idString}`)
      .send({ title: testString, completed: false })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.title).toBe(testString);
        expect(res.body.todo.completed).toBeFalsy();
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});
