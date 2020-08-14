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

let codes = document.querySelectorAll('.highlight > pre > code');
let countID = 0;
codes.forEach((code) => {

  code.setAttribute("id", "code" + countID);
  
  let btn = document.createElement('button');
  btn.innerHTML = "";
  btn.className = "btn-copy far fa-copy";
  btn.setAttribute("data-clipboard-action", "copy");
  btn.setAttribute("data-clipboard-target", "#code" + countID);
  
  let div = document.createElement('div');
  div.appendChild(btn);
  
  code.before(div);

  countID++;
}); 

let clipboard = new ClipboardJS('.btn-copy');