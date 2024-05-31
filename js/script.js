document.addEventListener("DOMContentLoaded", async () => {
    const url = 'https://volleyball-devs.p.rapidapi.com/media-players?lang=en';
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
        
        // Assuming the result contains an array of media items
        if (result && result.length > 0) {
            const video = result[0]; // Taking the first video in the result for simplicity
            
            document.getElementById('title').textContent = video.title;
            document.getElementById('subtitle').textContent = video.subtitle;
            document.getElementById('thumbnail').src = video.thumbnail_url;
            document.getElementById('video-link').href = video.url;
            document.getElementById('date-published').textContent = new Date(video.date_published).toLocaleDateString();
        } else {
            console.log('No video found for the specified player.');
        }
    } catch (error) {
        console.error(error);
    }
});