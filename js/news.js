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
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result); // Log the result to inspect the response structure

    const newsContainer = document.getElementById('news-container');
    if (result.articles && result.articles.length > 0) {
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
    } else {
      newsContainer.innerHTML = '<p>No news articles available at the moment.</p>';
    }
  } catch (error) {
    console.error('Error fetching the news:', error);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Failed to load news articles. Please try again later.</p>';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('#nav-menu a');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});