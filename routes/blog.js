const express = require('express');
const BLOG = require('../models/BlogSchema');
const multer = require('multer');
const route = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images');
    },
    fieldname: function (req, file, cb) {
        cb(null, Date.now().toLocaleString() + file.originalname)
    },
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    }
})

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


route.post('/post', upload.single('image'), async (req, res) => {
    console.log(req.file)
    let blog = await new BLOG({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        img: req.file.filename,
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

route.post('/edit/:id', async (req, res) => {

    try {
        await BLOG.updateOne({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
            }
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/blogs/')
    }
})


route.get('/delete/:id', async (req, res) => {
    try {
        await BLOG.deleteOne({ _id: req.params.id })
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})



module.exports = route;