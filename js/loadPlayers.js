// loadPlayers.js
document.addEventListener('DOMContentLoaded', () => {
  const gridButton = document.getElementById('grid');
  const listButton = document.getElementById('list');
  const playerProfilesContainer = document.getElementById('player-profiles');

  // Function to fetch and display players
  async function fetchAndDisplayPlayers(view = 'grid') {
    try {
      const response = await fetch('json/player.json');
      const data = await response.json();
      const players = data.player;

      // Clear the current content
      playerProfilesContainer.innerHTML = '';

      // Generate the player profiles
      players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = view === 'grid' ? 'player-grid' : 'player-list';

        const playerImg = document.createElement('img');
        playerImg.src = `../${player.image}`;
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
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  }

  // Event listeners for buttons
  gridButton.addEventListener('click', () => fetchAndDisplayPlayers('grid'));
  listButton.addEventListener('click', () => fetchAndDisplayPlayers('list'));

  // Fetch and display players in grid view by default
  fetchAndDisplayPlayers('grid');
});