const express = require('express');
const showdown = require('showdown');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))
})
app.get('/wiki/:name', (req, res) => {
    const param = req.params.name;
    const entry = entries.find(item => item.name === param);
    const converter = new showdown.Converter();
    const content = entry.content;
    const html = converter.makeHtml(content);
    res.status(200).json({data:html});
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})