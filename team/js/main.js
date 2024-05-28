document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-box .button');
    const mainContent = document.getElementById('main-content');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        fetchData(type);
      });
    });
  
    function fetchData(type) {
      // You need to replace `your-api-endpoint` with your actual API endpoint
      const apiEndpoint = `https://example.com/api/${type}`;
      
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          displayData(data, type);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  
    function displayData(data, type) {
      mainContent.innerHTML = `<h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>`;
      if (Array.isArray(data)) {
        data.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');
          itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          `;
          mainContent.appendChild(itemDiv);
        });
      } else {
        mainContent.innerHTML += `<p>${data.message}</p>`;
      }
    }
  });
  