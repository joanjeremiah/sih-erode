const mongoose = require('mongoose');

const Question = mongoose.model('QuestionSec', {

    title: String,
    type: {
        required: false,
        type: String
    },
    name: String
});


module.exports = Question