document.addEventListener('DOMContentLoaded', () => {
  const gridButton = document.getElementById('grid');
  const listButton = document.getElementById('list');
  const playerProfilesContainer = document.getElementById('player-profiles');

  // Fetch player data from JSON
  async function fetchPlayerData() {
    try {
      const response = await fetch('json/player.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching player data:', error);
      alert('Failed to load player data.');
    }
  }

  // Display player profiles
  function displayPlayers(players, view) {
    playerProfilesContainer.innerHTML = '';
    players.forEach(player => {
      const playerDiv = document.createElement('div');
      playerDiv.className = view === 'grid' ? 'player-grid' : 'player-list';

      const playerImg = document.createElement('img');
      playerImg.src = `${player.image}`;
      playerImg.alt = `${player.name} image`;

      const playerInfo = document.createElement('div');
      playerInfo.className = 'player-info';

      const playerName = document.createElement('h2');
      playerName.textContent = player.name;

      const playerPosition = document.createElement('p');
      playerPosition.textContent = `Position: ${player.position}`;

      const playerCountry = document.createElement('p');
      playerCountry.textContent = `Country: ${player.country}`;

      playerInfo.appendChild(playerName);
      playerInfo.appendChild(playerPosition);
      playerInfo.appendChild(playerCountry);
      playerDiv.appendChild(playerImg);
      playerDiv.appendChild(playerInfo);
      playerProfilesContainer.appendChild(playerDiv);
    });
  }

  // Fetch and display players
  async function fetchAndDisplayPlayers(view = 'grid') {
    const data = await fetchPlayerData();
    if (data) {
      displayPlayers(data.player, view);
    }
  }

  // Save grid/list preference to local storage
  gridButton.addEventListener('click', () => {
    fetchAndDisplayPlayers('grid');
    localStorage.setItem('viewPreference', 'grid');
  });

  listButton.addEventListener('click', () => {
    fetchAndDisplayPlayers('list');
    localStorage.setItem('viewPreference', 'list');
  });

  // Load preference from local storage
  const savedView = localStorage.getItem('viewPreference') || 'grid';
  fetchAndDisplayPlayers(savedView);
});