const router = require('express').Router();
const books = require('./books_dump');

let booksDirectory = books;


router.get('/books', function (req, res) {
    res.send(booksDirectory);
});

router.get('/books/:id', function (req, res) {
    const { id } = req.params;
    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.sendStatus(404).send('Book does not exist');

    res.send(book);

});

router.post('/books', function (req, res) {

    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        authors,
        categories
    } = req.body;

    const bookExist = booksDirectory.find(b => b.isbn === isbn);
    if(bookExist) return res.send("Book alredy exist");

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        authors,
        categories
    }
    booksDirectory.push(book);
    res.send(book);

});

router.put('/books/:id', function (req, res) {

    const { id } = req.params;
    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        authors,
        categories
    } = req.body;

    const book = booksDirectory.find(b => b.isbn === id);
    if(!book) return res.sendStatus(404).send("Book does not exist");
    
    const updateField = (val,prev) => !val ? prev : val

    const updatedBook = {
            ...book,
            title: updateField(title,book.title),
            pageCount: updateField(pageCount,book.pageCount),
            publishedDate: updateField(publishedDate,book.publishedDate),
            thumbnailUrl: updateField(thumbnailUrl,book.thumbnailUrl),
            longDescription: updateField(longDescription,book.longDescription),
            authors: updateField(authors,book.authors),
            categories: updateField(categories,book.categories)
    }

    bookIndex = booksDirectory.findIndex(b => b.isbn === id);
    booksDirectory.splice(bookIndex,1,updatedBook);

    res.send(updatedBook);

});

router.delete('/books/id', function (req, res) {
    const { id } = req.params;

    const book = booksDirectory.find(b => b.isbn === id)
    if(!book) return res.Status(404).send('Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.isbn!= id);
    return res.send(Success);
});

module.exports = router;