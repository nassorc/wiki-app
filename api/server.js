const express = require('express');
const showdown = require('showdown');
const path = require('path');

const wikiRouter = require('./routes/wikis');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));

let entries = [
    {
        id: 1,
        name: 'html',
        title: 'HTML markup language',
        content: '# Hello world\n *** ## Html is a markup language.'
    },
    {
        id: 2,
        name: 'javascript',
        title: 'The javascript language',
        content: '# JS docs \n --- \n JS is trash. \n `console.log(\'hello0\')` '
    }
]
const WikiModel = require('./model/wiki-entry-model')
app.get('/', async (req, res) => {
    const [result, _ ] = await WikiModel.findAll()
    console.log(result)
    // return index ejs and all wiki entries
    
    res.render('index', {entries: entries});
})
app.use('/wiki', wikiRouter);


app.listen(3000, () => {
    console.log('listening on port 3000');
})