const express = require('express')
const app = express()
const PORT = 3000 

app.use(express.json())

const bookRouter = require('./routes/routes')

app.use('/books', bookRouter)

app.listen(PORT, () => {
    console.log(`Server Connected at PORT: ${PORT}`);
})