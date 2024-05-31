const url = 'https://volleyball-devs.p.rapidapi.com/teams?lang=en&limit=50';
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
        displayData(data);
    } catch (error) {
        console.error(error);
    }
}

function displayData(data) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    data.forEach(team => {
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

        mainContent.appendChild(teamDiv);
    });
}

// Call the function to fetch data
fetchData();