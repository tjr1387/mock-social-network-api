const { Schema, model } = require('mongoose');

// Schema for reaction subdocument (maybe make this its own file and import it?)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // will need a getter on this in order to format
    },
  },
);

// Schema for Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now, // will need a getter on this in order to format
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],  //embedded subdoc
  },
  {
    // Include virtuals in response by default
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Virtual for reaction count (length of the assoc. reactions array)
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;