// Where do we want to put the articles
let weatherWarningsContainer = document.getElementById('weather-warnings');

// Set up our HTTP request
let xhr = new XMLHttpRequest();

// Setup our listener to process completed (asynchronous) requests
xhr.onload = function () {
  // Process our return data
  if (xhr.status >= 200 && xhr.status < 300) {
    let json = JSON.parse(xhr.responseText);
    console.log(json);
    buildFeed(json);
  } else {
    // What to do when the request fails
    console.log('The request failed!');
    weatherWarningsContainer.innerHTML = "The request for RSS feed failed. Please check your URL.";
  }
};

// Function to build and display the RSS feed
function buildFeed(data) {
  // Create the 'outer' container to hold everything
  let itemsContainer = document.createElement('DIV');

  // Loop through each item in the RSS feed
  for (let i = 0, t = data.items.length; i < t; ++i) {
    let item = data.items[i];  // get the item
    let itemContainer = document.createElement('DIV'); // create a container for each item

    // Create and update the link element
    let itemLinkElement = document.createElement('A');
    itemLinkElement.setAttribute('href', item.link);
    itemLinkElement.innerText = item.title;

    // Create and update the title
    let itemTitleElement = document.createElement('H2');
    itemTitleElement.appendChild(itemLinkElement);

    // Create and update the description
    let itemDescriptionElement = document.createElement('P');
    itemDescriptionElement.innerHTML = item.description;

    // Add elements to the item container
    itemContainer.appendChild(itemTitleElement);
    itemContainer.appendChild(itemDescriptionElement);

    // Add the item container to the main container
    itemsContainer.appendChild(itemContainer);
  }

  // Create and add the title of the RSS feed
  let titleElement = document.createElement('H1');
  titleElement.innerText = data.feed.title;

  // Add elements to the weather warnings container
  weatherWarningsContainer.appendChild(titleElement);
  weatherWarningsContainer.appendChild(itemsContainer);
}

// Function to handle the "Add RSS" button click event
function onAddRSSClicked(event) {
  let URL = document.getElementById('rss-input').value;
  document.getElementById('rss-input').value = ""; // Clear the input field

  // Send a GET request to fetch the RSS feed data
  xhr.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=' + URL);
  xhr.send();
}

// Add event listener for the "Add RSS" button click
document.getElementById('add-feed').addEventListener('click', onAddRSSClicked);
