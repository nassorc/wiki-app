const router = require('express').Router();
const showdown = require('showdown');
const WikiModel = require('../model/wiki-entry-model');

router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/new', (req, res) => {
    const { title, description, markdown } = req.body;

    const obj = new WikiModel(title, description, markdown);
    obj.save();

    return res.status(201).redirect('/')
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let [foundEntry, _] = await WikiModel.findOne(id);
    if(!foundEntry || foundEntry.length < 1) return res.sendStatus(404)
    foundEntry = foundEntry[0];
    const converter = new showdown.Converter();
    const content = foundEntry['entry_markdown'];
    const html = converter.makeHtml(content);
    return res.status(200).render('wiki', {html})    
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