const express = require('express');
const path = require('path');

const wikiRouter = require('./routes/wikis');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));

const WikiModel = require('./model/wiki-entry-model')
app.get('/', async (req, res) => {
    const [result, _ ] = await WikiModel.findAll()
    res.render('index', {entries: result});
})
app.use('/wiki', wikiRouter);

app.get('*', (req ,res) => {
    res.sendStatus(404);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})