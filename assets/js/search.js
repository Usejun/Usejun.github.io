// lunr 한국어 적용
lunr.ko(lunr);

fetch("/assets/js/search-data.json")
  .then(r => r.json())
  .then(pages => {
    const index = lunr(function () {
      this.use(lunr.ko);
      this.ref("url");
      this.field("title", { boost: 10 });
      this.field("content");

      pages.forEach(page => this.add(page));
    });

    const input = document.querySelector('#search-input');
    const results = document.querySelector('#search-results');

    input.addEventListener('input', function () {
      const query = input.value.trim();
      const hits = index.search(query);

      results.innerHTML = hits.map(hit => {
        const page = pages.find(p => p.url === hit.ref);
        return `<li><a href="${page.url}">${page.title}</a></li>`;
      }).join('');
    });
  });
