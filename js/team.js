document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // Restore last search from local storage
    const lastSearch = localStorage.getItem('lastSearch');
    const lastCategory = localStorage.getItem('lastCategory');
    if (lastSearch && lastCategory) {
        document.getElementById("searchBox").value = lastSearch;
        document.getElementById("categoryDropdown").value = lastCategory;
        await search(lastSearch, lastCategory);
    }
});

async function search(savedSearchQuery, savedCategory) {
    const category = savedCategory || document.getElementById('categoryDropdown').value;
    const searchQuery = savedSearchQuery || document.getElementById('searchBox').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    setLoading(true);

    // Save search criteria to local storage
    localStorage.setItem('lastSearch', searchQuery);
    localStorage.setItem('lastCategory', category);

    const getImageUrl = (hash) => `https://volleyball-devs.p.rapidapi.com/images/${hash}`;

    try {
        if (category === 'leagues') {
            const leagues = await fetchLeagues();
            if (leagues.length === 0) {
                resultDiv.innerHTML = 'No leagues found or an error occurred.';
                return;
            }
            const filteredLeagues = leagues.filter(league =>
                league.name.toLowerCase().includes(searchQuery)
            );
            resultDiv.innerHTML = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Start League</th>
                        <th>End League</th>
                        <th>Class Name</th>
                    </tr>
                    ${filteredLeagues.map(league => `
                        <tr>
                            <td>${league.id}</td>
                            <td><img src="${getImageUrl(league.hash_image)}" alt="${league.name}" width="50" /></td>
                            <td>${league.name}</td>
                            <td>${new Date(league.start_league).toLocaleDateString()}</td>
                            <td>${new Date(league.end_league).toLocaleDateString()}</td>
                            <td>${league.class_name}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        } else if (category === 'teams') {
            const teams = await fetchTeams();
            if (teams.length === 0) {
                resultDiv.innerHTML = 'No teams found or an error occurred.';
                return;
            }
            const filteredTeams = teams.filter(team =>
                team.name.toLowerCase().includes(searchQuery) && team.gender === 'F'
            );
            resultDiv.innerHTML = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Tournament</th>
                        <th>Gender</th>
                        <th>Name Code</th>
                    </tr>
                    ${filteredTeams.map(team => `
                        <tr>
                            <td>${team.id}</td>
                            <td><img src="${getImageUrl(team.hash_image)}" alt="${team.name}" width="50" /></td>
                            <td>${team.name}</td>
                            <td>${team.country_name}</td>
                            <td>${team.tournament_name}</td>
                            <td>${team.gender}</td>
                            <td>${team.name_code}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        } else if (category === 'countries') {
            const countries = await fetchCountries();
            if (countries.length === 0) {
                resultDiv.innerHTML = 'No countries found or an error occurred.';
                return;
            }
            const filteredCountries = countries.filter(country =>
                country.name.toLowerCase().includes(searchQuery)
            );
            resultDiv.innerHTML = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                    </tr>
                    ${filteredCountries.map(country => `
                        <tr>
                            <td>${country.id}</td>
                            <td><img src="${getImageUrl(country.hash_image)}" alt="${country.name}" width="50" /></td>
                            <td>${country.name} (${country.alpha})</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        } else if (category === 'seasons') {
            const seasons = await fetchSeasons();
            if (seasons.length === 0) {
                resultDiv.innerHTML = 'No seasons found or an error occurred.';
                return;
            }
            const filteredSeasons = seasons.filter(season =>
                season.name.toLowerCase().includes(searchQuery)
            );
            resultDiv.innerHTML = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Season Name</th>
                        <th>Year</th>
                        <th>League Name</th>
                        <th>League Image</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                    ${filteredSeasons.map(season => `
                        <tr>
                            <td>${season.id}</td>
                            <td>${season.name}</td>
                            <td>${season.year}</td>
                            <td>${season.league_name}</td>
                            <td><img src="${getImageUrl(season.league_hash_image)}" alt="${season.league_name}" width="50" /></td>
                            <td>${new Date(season.start_time).toLocaleDateString()}</td>
                            <td>${new Date(season.end_time).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred. Please try again later.';
    } finally {
        setLoading(false);
    }
}

function setLoading(isLoading) {
    document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
}

async function fetchCountries() {
    const url = 'https://volleyball-devs.p.rapidapi.com/countries?limit=50&lang=en&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
            'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result.data || result;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw new Error('Failed to fetch countries. Please try again later.');
    }
}

async function fetchLeagues() {
    const url = 'https://volleyball-devs.p.rapidapi.com/leagues?limit=50&lang=en&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
            'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result.data || result;
    } catch (error) {
        console.error('Error fetching leagues:', error);
        throw new Error('Failed to fetch leagues. Please try again later.');
    }
}

async function fetchTeams() {
    const url = 'https://volleyball-devs.p.rapidapi.com/teams?lang=en&limit=50&tournament_id=eq.1061&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
            'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result.data || result;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw new Error('Failed to fetch teams. Please try again later.');
    }
}

async function fetchSeasons() {
    const url = 'https://volleyball-devs.p.rapidapi.com/seasons?lang=en&offset=0&limit=50';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
            'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result.data || result;
    } catch (error) {
        console.error('Error fetching seasons:', error);
        throw new Error('Failed to fetch seasons. Please try again later.');
    }
}

document.getElementById("searchBtn").addEventListener('click', () => search());
document.getElementById("searchBox").addEventListener('keypress', (event) => {
    if (event.key === "Enter") search();
});