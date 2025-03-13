const express = require('express');
const mongoose = require('mongoose');
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('./NNPTUD_S5/category');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/categories', async (req, res) => {
    try {
        const category = await createCategory(req.body);
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/categories/:id', async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(404).send({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/categories/:id', async (req, res) => {
    try {
        const category = await updateCategory(req.params.id, req.body);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(404).send({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/categories/:id', async (req, res) => {
    try {
        const category = await deleteCategory(req.params.id);
        if (category) {
            res.status(200).send(category);
        } else {
            res.status(404).send({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

function GenString(length) {
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random() * source.length);
        result += source.charAt(rd);
    }
    return result;
}
