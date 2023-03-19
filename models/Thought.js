const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

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
         
        },   
    },
    {
        toJSON: {
           
            getters: true,
            // Format date and time when a reaction is posted
            transform: (doc, ret) => {
                ret.createdAt = moment(ret.createdAt).format('MMMM-DD-YYYY, h:mm:ss A');
                return ret;
            },
        },
        id: false,
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
           
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // Array that will hold all of the reactions
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
       
            getters: true,
            // Format Date and Time when a thought is posted
            transform: (doc, ret) => {
                ret.createdAt = moment(ret.createdAt).format('MMMM-DD-YYYY, h:mm:ss A');
                return ret;
            },
        },
        id: false,
    }
);

// Virtual will add 1 to the reaction count when a reaction is added to the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;