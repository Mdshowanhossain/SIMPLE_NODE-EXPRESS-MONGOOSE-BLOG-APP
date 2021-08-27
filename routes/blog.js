const express = require('express');
const BLOG = require('../models/BlogSchema');
const route = express.Router();




route.get('/new', (req, res) => {
    res.render('postBlog')
})

route.get('/:slug', async (req, res) => {
    try {
        let blog = await BLOG.findOne({ slug: req.params.slug })
        if (blog) {
            res.render('show', { blog: blog })
        } else {
            res.redirect('/')
        }
    } catch (err) {
        console.log(err)
    }
})


route.post('/post', async (req, res) => {
    // console.log(req.body)
    let blog = await new BLOG({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
    })
    try {
        blog = await blog.save();
        res.redirect(`${blog.slug}`)
    }
    catch (err) {
        console.log(err.message)
    }
})


route.get('/edit/:id', async (req, res) => {
    let blog = await BLOG.findById(req.params.id);
    try {
        blog = await blog.save()
        res.render('editBlog', { blog: blog })
    } catch (err) {
        console.log(err)
    }
})

route.put('/edit/:id', async (req, res) => {

    console.log(req.body)
    res.send(req.params.id)

    // req.blog = await BLOG.findById(req.params.id)

    // let blog = req.blog
    // blog.title = req.body.title
    // blog.author = req.body.author
    // blog.description = req.body.description

    // console.log(req.body)
    // try {
    //     blog = await blog.save();
    //     res.redirect('/')
    // } catch (err) {
    //     console.log(err)
    //     res.redirect(`blogs/edit/${blog.id}`, { blog: blog })
    // }
})



// route.get('/edit', (req, res) => {
//     // let blog = BLOG.findById(req.params.id);
//     // res.render('editBlog');
//     res.render('editBlog', { name: 'sohan' })
// })

// route.get('/blogs', (req, res) => {
//     res.send('sohan')
// })




module.exports = route;