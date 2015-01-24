
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Account = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    browserSignature: {  // todo not sure how to integrate
        type: String,
        trim: true,
        unique: true,
        required: 'Browser signature is required',  // probably not prompt text
        // validate
        // match
        makeSignature: makeBrowserSignature(plugins,userAgent,oscpu,platform)
    }
});

Account.plugin(passportLocalMongoose, {
    userExistsError: 'Sorry, %s %s is taken!'
});

function validateEmail (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


module.exports = mongoose.model('Account', Account);