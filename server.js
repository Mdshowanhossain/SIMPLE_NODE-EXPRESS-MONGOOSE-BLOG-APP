const express = require('express');
require('./database/db');
const BlogSchema = require('./models/BlogSchema');
const BlogRoute = require('./routes/blog');

const methodOverride = require('method-override')

const PORT = 8000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {

    let blogs = await BlogSchema.find().sort({ createdAt: 'desc' })

    res.render('homeCard', { blogs: blogs })
})

// app.get('/edit', (req, res) => {
//     res.send('sohan')
// })

app.use('/blogs', BlogRoute);



app.listen(PORT, () => {
    console.log(`Server is running now at ${PORT}`);
})