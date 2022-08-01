const db = require('../config/db.config');

class WikiEntryModel {
    static findAll() {
        return db.execute('SELECT * FROM wiki_entries');
    }
}

module.exports = WikiEntryModel;