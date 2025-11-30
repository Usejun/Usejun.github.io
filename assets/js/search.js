
lunr.ko(lunr);

(function() {
  const request = new XMLHttpRequest();
  request.open('GET', '/search-data.json');
  request.responseType = 'json';

  request.onload = () => {
    const pages = request.response;

    const index = lunr(function () {
      this.use(lunr.ko);       // 한글용 빌더 적용
      this.ref('id');
      this.field('title', { boost: 10 });
      this.field('content');

      pages.forEach((page, idx) => {
        page.id = idx;
        this.add(page);
      });
    });

    const input = document.querySelector('#search-input');
    const results = document.querySelector('#search-results');

    if (!input || !results) return;

    input.addEventListener('input', function () {
      const query = input.value.trim();
      if (!query) {
        results.innerHTML = '';
        return;
      }

      const hits = index.search(query);

      results.innerHTML = hits.map(hit => {
        const page = pages[hit.ref];
        return `
          <li class="search-result">
            <a href="${page.url}">
              <span class="search-result-title">${page.title}</span>
              <span class="search-result-excerpt">${page.excerpt}</span>
            </a>
          </li>`;
      }).join('');
    });
  };

  request.send();
})();

this.use(lunr.multiLanguage('en', 'ko'));