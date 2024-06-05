fetch('https://rss.weatherzone.com.au/?u=12994-1285&lt=aploc&lc=13896&obs=1&fc=1&warn=1')
  .then(response => response.text())
  .then(data => {
    // Parse the RSS feed data
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    const items = xml.querySelectorAll('item');

    // Create HTML elements for each item
    const feedContainer = document.getElementById('rss-feed-container');
    items.forEach(item => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      const pubDate = item.querySelector('pubDate').textContent;

      const article = document.createElement('article');
      article.innerHTML = `
        <h2><a href="${link}" target="_blank">${title}</a></h2>
        <p>Published: ${pubDate}</p>
      `;
      feedContainer.appendChild(article);
    });
  })
  .catch(error => {
    console.error('Error fetching RSS feed:', error);
  });