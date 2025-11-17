const express = require('express')
const router = express.Router()
const books = require('../books.json')

// GET
router.get('/', (req, res) => {
    try {
        if (books.length === 0) {
            return res.status(404).json({
                msg: 'No books found'
            })
        }

        res.status(200).json(books)


    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' })
    }
})

// GET by id
router.get('/:id', (req, res) => {
    try {
        const getBook = books.find(b => b.id === parseInt(req.params.id))

        if(!getBook){
            return res.status(404).json({
                msg: 'Book not found'
            })
        }

        res.status(200).json(getBook)

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' })
    }
})

// POST
router.post('/', (req, res) => {
    try {
        const { title, author } = req.body
        const newBook = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title,
            author
        }
        books.push(newBook)
        res.status(201).json({
            msg: 'New book created'
        })
    } catch (error) {
        res.status(500).json({ error: 'Somethinng went wrong' })
    }
})

// PUT
router.put('/:id', (req, res) => {
    try {
        const getBook = books.find(b => b.id === parseInt(req.params.id))

        if(!getBook){
            return res.status(404).json({
                msg: 'Book not found'
            })
        }

        const { title, author } = req.body
        getBook.title = title || books.title
        getBook.author = author || books.author

        res.status(200).json({
            msg: 'Successfully updated'
        })

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

// DELETE 
router.delete('/:id', (req, res) => {
    try {
        const getBookIndex = books.findIndex(b => b.id === parseInt(req.params.id))

        if(getBookIndex === -1){
            return res.status(404).json({
                msg: "Book not found"
            })
        }

        const deleteBook = books.splice(getBookIndex, 1)

        res.status(204).json({
            msg: 'Successfully deleted'
        })

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = router