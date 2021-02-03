const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: process.env.DB_NAME,
  })
  .then((res) => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));

const TodoSchema = new mongoose.Schema({
  content: String,
  writer: String,
  status: String,
  type: String,
  from: String,
  to: String,
  time: String,
  profile: String,
});

const Todo = mongoose.model("Todo", TodoSchema);

const getTodo = () => {
  return Todo.find({}, function (err, todo) {
    if (err) throw err;
    return todo;
  });
};

const postTodo = async ({ content, writer, status, type, from, to, time, profile }) => {
  const newTodo = new Todo({
    content,
    writer,
    status,
    type,
    from,
    to,
    time,
    profile,
  });

  return newTodo
    .save()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const deleteTodo = ({ id }) => {
  return Todo.deleteOne({ _id: id }, (err, todo) => {
    if (err) throw err;
    return todo.deletedCount;
  });
};

const updateTodo = async ({ id, status }) => {
  return Todo.updateOne({ _id: id }, { $set: { status: status } }, (err, todo) => {
    if (err) throw err;
    return todo;
  });
};

module.exports = { getTodo, postTodo, deleteTodo, updateTodo };
