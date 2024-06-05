fetch('http://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml')
    .then(response => response.text())
    .then(data => {
        // Parse XML data and extract relevant information
        // Update the #feed section with the parsed data
    })
    .catch(error => console.error('Error fetching RSS feed:', error));
