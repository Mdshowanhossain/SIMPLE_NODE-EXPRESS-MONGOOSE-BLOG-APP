const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');

mongoose.plugin(slug)
const blog = new mongoose.Schema({

    title: {
        type: String,
        require: true,

        trim: true,
    },
    author: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    img: {
        type: String,
        default: "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool.jpg",
    },
    slug: {
        type: String,
        slug: "title",

        slug_padding_size: 2,
    },
    snippet: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

blog.pre('validate', function (next) {
    //check if there is a description
    if (this.description) {
        this.description = htmlPurify.sanitize(this.description);
        this.snippet = (this.description.substring(0, 200)).result;
    }

    next();
});


module.exports = new mongoose.model("Blog", blog);