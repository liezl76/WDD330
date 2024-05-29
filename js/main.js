const apiKey = '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e';
const apiHost = 'api-volleyball.p.rapidapi.com';

document.getElementById('search-button').addEventListener('click', fetchTeamStatistics);

async function fetchTeamStatistics() {
  const query = document.getElementById('search-input').value;
  const url = `https://api-volleyball.p.rapidapi.com/teams?search=${query}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    displayTeamStatistics(result);
  } catch (error) {
    console.error(error);
  }
}

function displayTeamStatistics(data) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ''; // Clear any existing content

  if (data.errors || !data.response || data.response.length === 0) {
    mainContent.textContent = 'No data found for the given query.';
    return;
  }

  data.response.forEach(team => {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team-statistics');

    const country = document.createElement('p');
    country.textContent = `Country: ${team.country}`;
    teamDiv.appendChild(country);

    const league = document.createElement('p');
    league.textContent = `League: ${team.league}`;
    teamDiv.appendChild(league);

    const teamName = document.createElement('p');
    teamName.textContent = `Team: ${team.name}`;
    teamDiv.appendChild(teamName);

    const games = document.createElement('p');
    games.textContent = `Games: ${team.games}`;
    teamDiv.appendChild(games);

    const goals = document.createElement('p');
    goals.textContent = `Goals: ${team.goals}`;
    teamDiv.appendChild(goals);

    mainContent.appendChild(teamDiv);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});