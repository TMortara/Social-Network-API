const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

// Reactions subdocument schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
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
            get: function() {
                return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_FULL);
            },
        },   
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

// thoughtSchema is the parent document
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
            default: Date.now,
            get: function() {
                return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_FULL);
            }
        },
        username: {
            type: String,
            required: true,
        },
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // },
        // Array that will hold all of the reactions
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;