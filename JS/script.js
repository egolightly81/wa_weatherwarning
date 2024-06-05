document.addEventListener('DOMContentLoaded', () => {
    const weatherWarningsContainer = document.getElementById('weather-warnings');
  
    // Function to fetch and display weather warnings
    async function fetchWeatherWarnings() {
      try {
        const response = await fetch('https://rss.weatherzone.com.au/?u=12994-1285&lt=aploc&lc=13896&obs=1&fc=1&warn=1');
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  
        const warnings = xmlDoc.querySelectorAll('item');
        let warningsHTML = '<h2>Current Weather Warnings:</h2>';
  
        warnings.forEach(warning => {
          const title = warning.querySelector('title').textContent;
          const description = warning.querySelector('description').textContent;
          warningsHTML += `<div><strong>${title}</strong>: ${description}</div>`;
        });
  
        weatherWarningsContainer.innerHTML = warningsHTML;
      } catch (error) {
        console.error('Error fetching weather warnings:', error);
        weatherWarningsContainer.innerHTML = 'Failed to fetch weather warnings. Please try again later.';
      }
    }
  
    // Fetch weather warnings on page load
    fetchWeatherWarnings();
  });
  