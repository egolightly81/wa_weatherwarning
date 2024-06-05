async function fetchRSSFeed(url) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const fullUrl = proxyUrl + url;
  
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text(); // Use .text() to get the XML data
      return data; // or process the data here
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      return null;
    }
  }
  
  // Usage example
  const rssUrl = 'http://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml';
  fetchRSSFeed(rssUrl).then(data => {
    if (data) {
      console.log(data); // or display the data on the webpage
    } else {
      console.log('Failed to fetch RSS feed.');
    }
  });
  