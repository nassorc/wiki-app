const db = require('../config/db.config');

class WikiEntryModel {
    constructor(title, description, markdown) {
        this.setTitle(title);
        this.setDescription(description);
        this.setMarkdown(markdown);
        this.setDate();
    }

    getTitle() {
        return this.title;
    }
    setTitle(title) {
        if (!title || title.length < 1) throw 'The title cannot be empty'
        title = title.trim();
        this.title = title;
    }

    getDescription() {
        return this.description;
    }
    setDescription(description) {
        if (!description || description.length < 1) throw 'The description cannot be empty'
        description = description.trim();
        this.description = description;
    }

    getDate() {
        return this.date;
    }
    setDate() {
        this.date = (new Date()).toLocaleString();
    }

    getMarkdown() {
        return this.markdown;
    }
    setMarkdown(markdown) {
        if (!markdown || markdown.length < 1) throw 'The markdown cannot be empty'
        markdown = markdown.trim();
        this.markdown = markdown;
    }

    static findAll() {
        return db.execute('SELECT * FROM wiki_entries');
    }
    static findOne(id) {
        return db.execute('SELECT * FROM wiki_entries WHERE id = ?', [id])
    }
    static match(query) {
        const sql = `SELECT * FROM wiki_entries WHERE entry_title LIKE '${query}%'`
        return db.execute(sql);
    }
    save() {
        return db.execute('INSERT INTO wiki_entries \
        (entry_title, entry_description, entry_markdown, createdAt) \
        VALUES (?,?,?,?)',
        [this.title, this.description, this.markdown, this.date])
    }
}

module.exports = WikiEntryModel;