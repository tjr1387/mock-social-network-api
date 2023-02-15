const { Schema, model } = require('mongoose');

// Schema for User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email syntax invalid.'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // Include virtuals in response by default
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for friend count (length of the assoc. friends array)
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

// Initialize model
const User = model('user', userSchema);

module.exports = User;