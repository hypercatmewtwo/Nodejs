const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

categorySchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})

const Category = mongoose.model('Category', categorySchema)

const createCategory = async (data) => {
    const category = new Category(data)
    return await category.save()
}

const getCategories = async () => {
    return await Category.find({ isDeleted: false })
}

const getCategoryById = async (id) => {
    return await Category.findById(id)
}

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true })
}

const deleteCategory = async (id) => {
    return await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

app.post('/categories', async (req, res) => {
    try {
        const category = await createCategory(req.body)
        res.status(201).send(category)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/categories', async (req, res) => {
    try {
        const categories = await getCategories()
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/categories/:id', async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id)
        if (category) {
            res.status(200).send(category)
        } else {
            res.status(404).send({ message: "Category not found" })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.put('/categories/:id', async (req, res) => {
    try {
        const category = await updateCategory(req.params.id, req.body)
        if (category) {
            res.status(200).send(category)
        } else {
            res.status(404).send({ message: "Category not found" })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/categories/:id', async (req, res) => {
    try {
        const category = await deleteCategory(req.params.id)
        if (category) {
            res.status(200).send(category)
        } else {
            res.status(404).send({ message: "Category not found" })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function GenString(length) {
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random() * source.length)
        result += source.charAt(rd)
    }
    return result
}