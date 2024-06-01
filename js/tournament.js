document.addEventListener("DOMContentLoaded", async () => {
    const teamStatsUrl = 'https://volleyball-devs.p.rapidapi.com/team-stats';
    const playerStatsUrl = 'https://volleyball-devs.p.rapidapi.com/player-stats';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
            'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
        }
    };

    try {
        const [teamStatsResponse, playerStatsResponse] = await Promise.all([
            fetch(teamStatsUrl, options),
            fetch(playerStatsUrl, options)
        ]);

        const teamStats = await teamStatsResponse.json();
        const playerStats = await playerStatsResponse.json();

        const teamsContainer = document.getElementById('teams-container');
        const playersContainer = document.getElementById('players-container');

        teamStats.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'card';

            const teamName = document.createElement('h3');
            teamName.textContent = team.name;

            const teamWins = document.createElement('p');
            teamWins.textContent = `Wins: ${team.wins}`;

            const teamLosses = document.createElement('p');
            teamLosses.textContent = `Losses: ${team.losses}`;

            const teamLogo = document.createElement('img');
            teamLogo.src = `https://example.com/images/${team.logo_hash}.jpg`;
            teamLogo.alt = `Logo of ${team.name}`;

            teamCard.appendChild(teamLogo);
            teamCard.appendChild(teamName);
            teamCard.appendChild(teamWins);
            teamCard.appendChild(teamLosses);

            teamsContainer.appendChild(teamCard);
        });

        playerStats.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'card';

            const playerName = document.createElement('h3');
            playerName.textContent = player.name;

            const playerPosition = document.createElement('p');
            playerPosition.textContent = `Position: ${player.position}`;

            const playerPoints = document.createElement('p');
            playerPoints.textContent = `Points: ${player.points}`;

            const playerImage = document.createElement('img');
            playerImage.src = `https://example.com/images/${player.image_hash}.jpg`;
            playerImage.alt = `Image of ${player.name}`;

            playerCard.appendChild(playerImage);
            playerCard.appendChild(playerName);
            playerCard.appendChild(playerPosition);
            playerCard.appendChild(playerPoints);

            playersContainer.appendChild(playerCard);
        });
    } catch (error) {
        console.error(error);
    }
});