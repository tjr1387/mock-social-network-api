const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
