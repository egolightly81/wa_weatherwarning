document.addEventListener('DOMContentLoaded', function() {
    const rssUrl = 'http://rss.weather.com.au/wa/perth'; // Hardcoded RSS feed URL
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.items) {
                throw new Error('RSS feed data is empty or invalid.');
            }

            const items = data.items;
            let feedContent = '';

            items.forEach(item => {
                const title = item.title || 'No Title';
                const description = item.description || 'No Description';
                feedContent += `<div><h3>${title}</h3><p>${description}</p></div>`;
            });

            document.getElementById('content').innerHTML = feedContent;
        })
        .catch(error => console.error('Error fetching RSS feed:', error.message));
});
