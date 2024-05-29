const url = 'https://volleyball.sportdevs.com/teams';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
        'x-rapidapi-host': 'volleyball-devs.p.rapidapi.com'
    }
};

async function searchTeams() {
    const searchInput = document.getElementById('search-input').value.trim();
    const searchUrl = `${url}?country_id=eq.${searchInput}&lang=en&limit=50`;

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
        teamCountry.textContent = `Country ID: ${team.country_id}`;

        const teamDetails = document.createElement('p');
        teamDetails.textContent = `League ID: ${team.primary_league_id}`;

        if (team.hash_image) {
            const teamImage = document.createElement('img');
            teamImage.src = `https://images.sportdevs.com/${team.hash_image}.png`;
            teamImage.alt = `${team.name} logo`;
            teamDiv.appendChild(teamImage);
        }

        teamDiv.appendChild(teamName);
        teamDiv.appendChild(teamCountry);
        teamDiv.appendChild(teamDetails);

        mainContent.appendChild(teamDiv);
    });
}