const APP = {
    query: null,
    contentDOM: null,
    titleDOM: null,
    init: () => {
        APP.addListeners();
        APP.titleDOM = document.getElementById('site-title');
        APP.contentDOM = document.getElementById('site-content');

    },
    addListeners: () => {
        document
            .getElementById('search-btn')
            .addEventListener('click', APP.handleSearch);
    },
    ////////////////////////////////////////////////////////////
    handleSearch: async (ev) => {
        APP.query = document.getElementById('search-inp').value;
        const res = await fetch(`http://localhost:3000/wiki/${APP.query}`);
        const data = await res.json();
        APP.contentDOM.innerHTML = data.data;
    },
    ////////////////////////////////////////////////////////////

}
window.addEventListener('DOMContentLoaded', APP.init);