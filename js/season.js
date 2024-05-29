document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');
  const mainContent = document.getElementById('main-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const dataType = button.getAttribute('data-type');
      if (dataType === 'season') {
        fetchSeasons();
      }
    });
  });

  async function fetchSeasons() {
    const url = 'https://api-volleyball.p.rapidapi.com/seasons';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
        'x-rapidapi-host': 'api-volleyball.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      displaySeasons(data.response);
    } catch (error) {
      console.error('Error fetching seasons:', error);
      mainContent.innerHTML = 'Failed to load seasons data.';
    }
  }

  function displaySeasons(seasons) {
    if (seasons.length === 0) {
      mainContent.innerHTML = '<p>No seasons available.</p>';
      return;
    }

    const seasonList = document.createElement('ul');
    seasons.forEach(season => {
      const listItem = document.createElement('li');
      listItem.textContent = season; // Each season is a number in your response
      seasonList.appendChild(listItem);
    });
    mainContent.innerHTML = '';
    mainContent.appendChild(seasonList);
  }
});