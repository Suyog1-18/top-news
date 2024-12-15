const API_KEY = '02b87f06f1a84fda80aac46be52ebdb5'; // Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'ok') {
      displayNews(data.articles);
    } else {
      console.error('Error fetching news:', data.message);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = ''; // Clear existing news
  articles.forEach((article) => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';

    newsCard.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="${article.title}">
      <h2>${article.title}</h2>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;

    newsContainer.appendChild(newsCard);
  });
}

// Fetch and display the news on page load
fetchNews();
