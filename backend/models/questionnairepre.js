const mongoose = require('mongoose');

const Question = mongoose.model('QuestionPre', {

    title: String,
    type: {
        required: false,
        type: String
    },
    name: String,
    isPositive: Boolean
});


module.exports = Question