const { User } = require('../models');

module.exports = {
  // a POST which adds another user to the user's friends array
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user found with that ID'})
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));

  },
  // a DELETE which removes a user from the user's friends array
  removeFriend (req, res) {

  }
}

