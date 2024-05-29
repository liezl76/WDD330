document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');
  const mainContent = document.getElementById('main-content');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const dataType = button.getAttribute('data-type');
      if (dataType === 'season') {
        // Handle season button click
      } else if (dataType === 'countries') {
        // Handle countries button click
      } else if (dataType === 'teams') {
        // Handle teams button click
      } else if (dataType === 'search') {
        search();
      }
    });
  });

  async function search() {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Please enter a search query.');
      return;
    }

    try {
      const response = await fetch(`https://api-volleyball.p.rapidapi.com/search?query=${query}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
          'x-rapidapi-host': 'api-volleyball.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      displaySearchResults(data.response);
    } catch (error) {
      console.error('Error fetching search results:', error);
      mainContent.innerHTML = `Failed to load search results. ${error.message}`;
    }
  }

  function displaySearchResults(results) {
    // Display search results code goes here
    if (results.length === 0) {
      mainContent.innerHTML = '<p>No results found.</p>';
      return;
    }

    const resultList = document.createElement('ul');
    results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = result;
      resultList.appendChild(listItem);
    });
    mainContent.innerHTML = '';
    mainContent.appendChild(resultList);
  }
});