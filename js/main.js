SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json'
})

tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.js-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2',
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: true,
    headingsOffset :  1,
    scrollSmooth: true
});