const { Schema, model, Types} = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: 'Email is a required field',
    unique: true
  },
  password: {
    type: String,
    required: 'Password is a required field'
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  following: [{ type: Types.ObjectId, ref: 'Users' }],
  follows: [{ type: Types.ObjectId, ref: 'Users' }],
});

module.exports = model('User', schema);