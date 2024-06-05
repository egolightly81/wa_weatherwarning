fetch('https://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml')
    .then(response => response.text())
    .then(data => {
        // Parse XML data
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, 'text/xml');

        // Extract relevant information
        let items = xmlDoc.getElementsByTagName('item');
        let feedContent = '';

        for (let i = 0; i < items.length; i++) {
            let title = items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
            let description = items[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;

            // Example: Build HTML content for each item
            feedContent += `<div><h3>${title}</h3><p>${description}</p></div>`;
        }

        // Update the #feed section with the parsed data
        document.getElementById('feed').innerHTML = feedContent;
    })
    .catch(error => console.error('Error fetching RSS feed:', error));
