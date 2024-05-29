const url = 'https://volleyball-devs.p.rapidapi.com/agg-news-matches?lang=en&offset=0&match_id=eq.2876&limit=50';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
		'x-rapidapi-host': 'volleyball-devs.p.rapidapi.com'
	}
};

async function fetchNewsData() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
		updateNewsSection(result);
	} catch (error) {
		console.error(error);
	}
}

function updateNewsSection(data) {
	const newsContainer = document.getElementById('news-container');
	newsContainer.innerHTML = ''; // Clear any existing content

	if (data && data.length > 0) {
		data.forEach(item => {
			const newsElement = document.createElement('div');
			newsElement.className = 'news-item';
			newsElement.innerHTML = `
				<h3>${item.title}</h3>
				<p>${item.description}</p>
				<a href="${item.link}" target="_blank">Read more</a>
			`;
			newsContainer.appendChild(newsElement);
		});
	} else {
		const noNewsElement = document.createElement('div');
		noNewsElement.className = 'news-item';
		noNewsElement.innerHTML = '<p>No news found.</p>';
		newsContainer.appendChild(noNewsElement);
	}
}

fetchNewsData();