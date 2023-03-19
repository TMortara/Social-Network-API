const { Schema, model } = require('mongoose');
// const validator = require('mongoose-validator');

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
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'You must add a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual will add one to the friend count each time a friend is added to the friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Delete thought associated with a user when the user is deleted
userSchema.pre('remove', function() {
    Thought.deleteMany(
        { _id: req.params.thoughtId }
    )
    next();
});

const User = model('User', userSchema);

module.exports = User;