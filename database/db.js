const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Blog-Application')
    .then(() => console.log('Your Database Connection Successfully!'))
    .catch((err) => console.log(err))