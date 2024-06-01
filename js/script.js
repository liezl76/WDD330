document.addEventListener("DOMContentLoaded", async () => {
    const url = 'https://volleyball-devs.p.rapidapi.com/media-leagues?limit=50&offset=0&league_id=eq.3024&lang=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
            'X-RapidAPI-Host': 'volleyball-devs.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const videosContainer = document.getElementById('videos-container');

        // Filter to get only women's volleyball games
        const womensGames = result.filter(game => game.gender === 'women');

        womensGames.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';

            const videoTitle = document.createElement('h1');
            videoTitle.textContent = video.title;

            const videoSubtitle = document.createElement('h2');
            videoSubtitle.textContent = video.subtitle;

            const videoThumbnail = document.createElement('img');
            videoThumbnail.src = video.thumbnail_url;
            videoThumbnail.alt = `Thumbnail of ${video.title}`;

            const videoLink = document.createElement('a');
            videoLink.href = video.url;
            videoLink.target = '_blank';
            videoLink.appendChild(videoThumbnail);

            const videoDate = document.createElement('p');
            videoDate.innerHTML = `Published Date: <span>${new Date(video.date_published).toLocaleDateString()}</span>`;

            videoCard.appendChild(videoTitle);
            videoCard.appendChild(videoSubtitle);
            videoCard.appendChild(videoLink);
            videoCard.appendChild(videoDate);

            videosContainer.appendChild(videoCard);
        });
    } catch (error) {
        console.error(error);
    }
});