document.addEventListener('DOMContentLoaded', function () {
    // Get current year
    document.getElementById('currentYear').innerText = new Date().getFullYear();

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