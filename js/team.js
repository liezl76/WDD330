const url = 'https://volleyball-devs.p.rapidapi.com/teams';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
        'x-rapidapi-host': 'volleyball-devs.p.rapidapi.com'
    }
};

async function searchTeams() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    let searchUrl = `${url}?lang=en&limit=50`;

    if (searchInput) {
        if (isNaN(searchInput)) {
            // Assume it's a country name if the input is not a number
            searchUrl += `&country_name=like.%${searchInput}%`;
        } else {
            // Assume it's a league ID if the input is a number
            searchUrl += `&primary_league_id=eq.${searchInput}`;
        }
    }

    try {
        const response = await fetch(searchUrl, options);
        const data = await response.json();
        displayTeams(data);
    } catch (error) {
        console.error(error);
    }
}

function displayTeams(teams) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    if (teams.length === 0) {
        mainContent.innerHTML = '<p>No teams found.</p>';
        return;
    }

    teams.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');

        const teamName = document.createElement('h2');
        teamName.textContent = team.name;

        const teamCountry = document.createElement('p');
        teamCountry.textContent = `Country: ${team.country}`;

        const teamDetails = document.createElement('p');
        teamDetails.textContent = `League: ${team.primary_league_id}`;

        teamDiv.appendChild(teamName);
        teamDiv.appendChild(teamCountry);
        teamDiv.appendChild(teamDetails);

        mainContent.appendChild(teamDiv);
    });
}