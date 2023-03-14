const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// const { create } = require('../../models/Thought');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtID/reactions').create(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtID/reactions/:reactionId').delete(deleteReaction);

module.exports = router;