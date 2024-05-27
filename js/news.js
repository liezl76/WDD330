document.addEventListener("DOMContentLoaded", async () => {
  const url = 'https://real-time-sports-news-api.p.rapidapi.com/live-articles';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5d938aa76dmsha69182664755b89p167d0bjsn66e606d1b47e',
      'X-RapidAPI-Host': 'real-time-sports-news-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const newsContainer = document.getElementById('news-container');
    result.articles.forEach(article => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error(error);
  }
});

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});