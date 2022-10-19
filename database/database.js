const { magenta, bold } = require('colorette');
const mongoose = require('mongoose');
require('dotenv').config();

const database = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        err ? console.log(err) :
            console.log
                (magenta
                    (bold
                        ("Database connected successfully!")));
    });
}
module.exports = database;      