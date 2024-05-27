document.addEventListener("DOMContentLoaded", function () {
    fetch('players.json')
      .then(response => response.json())
      .then(data => {
        const profileContainer = document.getElementById('profile-container');
        data.forEach(player => {
          const playerCard = document.createElement('div');
          playerCard.className = 'player-card';
          playerCard.innerHTML = `
            <img src="${player.image}" alt="${player.name}">
            <h3>${player.name}</h3>
            <p>Position: ${player.position}</p>
            <p>Country: ${player.country}</p>
          `;
          profileContainer.appendChild(playerCard);
        });
      })
      .catch(error => console.error('Error fetching player data:', error));
  });  