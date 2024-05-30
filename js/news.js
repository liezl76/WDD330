const newsUrl = 'https://volleyball-devs.p.rapidapi.com/agg-news-matches?lang=en&offset=0&match_id=eq.2876&limit=50';
const teamNewsUrl = 'https://volleyball-devs.p.rapidapi.com/agg-news-teams?offset=0&team_id=eq.236590&lang=en&limit=50';
const leagueNewsUrl = 'https://volleyball-devs.p.rapidapi.com/agg-news-leagues?limit=50&league_id=eq.7574&offset=0&lang=en';
const translateUrl = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
const rapidApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
		'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
	}
};
const translateOptions = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
		'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
	}
};

async function fetchNewsData() {
	try {
		const response = await fetch(newsUrl, rapidApiOptions);
		const result = await response.json();
		console.log(result);
		updateNewsSection(result, 'news-container');
	} catch (error) {
		console.error(error);
	}
}

async function fetchTeamNewsData() {
	try {
		const response = await fetch(teamNewsUrl, rapidApiOptions);
		const result = await response.json();
		console.log(result);
		updateNewsSection(result, 'team-news-container');
	} catch (error) {
		console.error(error);
	}
}

async function fetchLeagueNewsData() {
	try {
		const response = await fetch(leagueNewsUrl, rapidApiOptions);
		const result = await response.json();
		console.log(result);
		updateNewsSection(result, 'league-news-container');
	} catch (error) {
		console.error(error);
	}
}

async function translateText(text) {
	try {
		const response = await fetch(translateUrl, {
			...translateOptions,
			body: new URLSearchParams({
				from: 'auto',
				to: 'en',
				text: text
			})
		});
		const result = await response.json();
		if (result.data && result.data.translations && result.data.translations.length > 0) {
			return result.data.translations[0].translatedText;
		} else {
			throw new Error('Translation API response is not as expected');
		}
	} catch (error) {
		console.error(error);
		return text; // Return original text if translation fails
	}
}

async function updateNewsSection(data, containerId) {
	const newsContainer = document.getElementById(containerId);
	newsContainer.innerHTML = ''; // Clear any existing content

	if (data && data.length > 0) {
		for (const item of data) {
			const title = item.title;
			const description = item.description;

			// Translate title and description to English if they are not in English
			const translatedTitle = await translateText(title);
			const translatedDescription = await translateText(description);

			const newsElement = document.createElement('div');
			newsElement.className = 'news-item';
			newsElement.innerHTML = `
				<h3>${translatedTitle}</h3>
				<p>${translatedDescription}</p>
				<a href="${item.link}" target="_blank">Read more</a>
			`;
			newsContainer.appendChild(newsElement);
		}
	} else {
		const noNewsElement = document.createElement('div');
		noNewsElement.className = 'news-item';
		noNewsElement.innerHTML = '<p>No news found.</p>';
		newsContainer.appendChild(noNewsElement);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	fetchNewsData();
	fetchTeamNewsData();
	fetchLeagueNewsData();
});