const teamsUrl = 'https://volleyball.sportdevs.com/teams';
const countriesUrl = 'https://volleyball.sportdevs.com/countries';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
        'x-rapidapi-host': 'volleyball-devs.p.rapidapi.com'
    }
};

window.onload = async () => {
    await fetchCountries();
};

async function searchTeams() {
    const searchInput = document.getElementById('search-input').value.trim();
    const searchUrl = `${teamsUrl}?country_id=eq.${searchInput}&lang=en&limit=50`;

    try {
        const response = await fetch(searchUrl, options);
        const data = await response.json();
        displayTeams(data);
    } catch (error) {
        console.error(error);
    }
}

async function fetchCountries() {
    try {
        const response = await fetch(countriesUrl, options);
        const data = await response.json();
        displayCountries(data);
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

function displayCountries(countries) {
    const countriesContent = document.getElementById('countries-content');
    countriesContent.innerHTML = '';

    if (countries.length === 0) {
        countriesContent.innerHTML = '<p>No countries found.</p>';
        return;
    }

    const countriesList = document.createElement('ul');
    countries.forEach(country => {
        const countryItem = document.createElement('li');
        countryItem.textContent = `${country.name} (ID: ${country.id})`;
        countriesList.appendChild(countryItem);
    });

    countriesContent.appendChild(countriesList);
}