const router = require('express').Router();


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

router.get('/', (req, res) => {
    console.log('router')
})

router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/new', (req, res) => {
    const { title, markdown } = req.body;

    const newEntry = {
        id: entries.length + 1,
        title,
        markdown
    }
    entries.push(newEntry)

    console.log(entries)

    return res.status(201).redirect('/')
})
router.get('/:id', (req, res) => {
    const param = req.params.id;
    const entry = entries.find(item => item.id === param);
    const converter = new showdown.Converter();
    const content = entry.content;
    const html = converter.makeHtml(content);
    console.log(id)
})
router.get('/:name', (req, res) => {
    const param = req.params.name;
    const entry = entries.find(item => item.name === param);
    const converter = new showdown.Converter();
    const content = entry.content;
    const html = converter.makeHtml(content);
    res.status(200).json({data:html});
})

module.exports = router;