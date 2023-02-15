const { Schema, Types, model } = require('mongoose');


//helper function for formatting date in the 'getter'
function formatDate(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` + 
         ` on ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

// Schema for reaction subdocument (maybe make this its own file and import it?)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
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
      default: Date.now,
      get: (date) => formatDate(date) // will need a getter on this in order to format
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
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
      get: (date) => formatDate(date)
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
      getters: true
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