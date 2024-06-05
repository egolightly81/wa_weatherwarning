// Where do we want to put the articles
let content = document.querySelector('main');

// In order to communicate with the server, we must first define an
// XMLHttpRequest object (XHR). This object is what allows us to connect to the
// server without refreshing the browser; it is the core of any Ajax application.
let xhr = new XMLHttpRequest();

// Setup our listener to process completed (asynchronous) requests
xhr.onload = function () {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
        const json = JSON.parse(xhr.responseText);
        buildFeed(json);
    } else {
        // What to do when the request fails
        console.log('The request failed!');
        content.innerHTML = "The request for an RSS feed failed, please check your URL";
    }
};

// Create and send a GET request
function onAddRSSClicked(event) {
    let URL = 'https://rss.weatherzone.com.au/?u=12994-1285&lt=aploc&lc=13896&obs=1&fc=1&warn=1';
    xhr.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(URL));
    xhr.send();
}

// Build the feed items
function buildFeed(data) {
    // Clear the existing content
    content.innerHTML = '';

    // Create the title element
    let titleElement = document.createElement('h2');
    titleElement.innerText = data.feed.title;
    content.appendChild(titleElement);

    // Create the feed items
    data.items.forEach(item => {
        let itemContainer = document.createElement('article');

        let itemLinkElement = document.createElement('a');
        itemLinkElement.setAttribute('href', item.link);
        itemLinkElement.setAttribute('target', '_blank');
        itemLinkElement.innerText = item.title;

        let itemTitleElement = document.createElement('h3');
        itemTitleElement.appendChild(itemLinkElement);

        let itemDescriptionElement = document.createElement('p');
        itemDescriptionElement.innerHTML = item.description;

        itemContainer.appendChild(itemTitleElement);
        itemContainer.appendChild(itemDescriptionElement);

        content.appendChild(itemContainer);
    });
}

// Add event listener to the "Get Articles" button
let addFeedButton = document.getElementById("add-feed");
addFeedButton.addEventListener('click', onAddRSSClicked);