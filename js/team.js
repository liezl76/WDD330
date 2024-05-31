const url = 'https://volleyball-devs.p.rapidapi.com/teams?lang=en';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
        'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
    }
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const womensTeams = data.filter(team => team.gender === 'F'); // Filter for women's teams
        displayData(womensTeams);
    } catch (error) {
        console.error(error);
    }
}

function displayData(teams) {
    const teamProfiles = document.getElementById('team-profiles');
    teamProfiles.innerHTML = '';

    teams.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';

        teamDiv.innerHTML = `
            <h2>${team.name}</h2>
            <p><strong>Short Name:</strong> ${team.short_name}</p>
            <p><strong>Full Name:</strong> ${team.full_name}</p>
            <p><strong>Gender:</strong> ${team.gender}</p>
            <p><strong>Country:</strong> ${team.country_name}</p>
            <p><strong>League:</strong> ${team.primary_league_name}</p>
            <p><strong>Tournament:</strong> ${team.tournament_name}</p>
            <p><strong>Arena:</strong> ${team.arena_name}</p>
            <img src="https://volleyball-devs.p.rapidapi.com/images/${team.hash_image}" alt="${team.name} logo" />
        `;

        teamProfiles.appendChild(teamDiv);
    });
}

function setGridView() {
    const teamProfiles = document.getElementById('team-profiles');
    teamProfiles.classList.add('grid');
    teamProfiles.classList.remove('list');
}

function setListView() {
    const teamProfiles = document.getElementById('team-profiles');
    teamProfiles.classList.add('list');
    teamProfiles.classList.remove('grid');
}

// Call the function to fetch data
fetchData();

// Add event listeners for Grid and List buttons
document.getElementById('grid').addEventListener('click', setGridView);
document.getElementById('list').addEventListener('click', setListView);
