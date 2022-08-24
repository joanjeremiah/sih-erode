const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = "mongodb+srv://joan1234:joan1234@cluster1.k51tm.mongodb.net/negativeEmotions?retryWrites=true&w=majority"
// Connect MongoDB at default port 27017.
let mong = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
