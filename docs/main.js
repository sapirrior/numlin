(function() {
  // Theme management
  const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  window.addEventListener('DOMContentLoaded', () => {
    // Inject Navigation if placeholder exists
    const navPlaceholder = document.getElementById('sidebar-nav');
    if (navPlaceholder) {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      
      const menu = [
        { title: 'Overview', items: [
          { id: 'index.html', label: 'Introduction' },
          { id: 'installation.html', label: 'Installation' }
        ]},
        { title: 'API Reference', items: [
          { id: 'creation.html', label: 'Creation' },
          { id: 'vector.html', label: 'Vector Class' },
          { id: 'matrix.html', label: 'Matrix Class' },
          { id: 'operations.html', label: 'Operations' }
        ]}
      ];

      let navHtml = '<nav><ul>';
      menu.forEach(section => {
        navHtml += `<li class="nav-section-title">${section.title}</li>`;
        section.items.forEach(item => {
          const activeClass = currentPath === item.id ? 'active' : '';
          navHtml += `<li><a href="${item.id}" class="nav-link ${activeClass}">${item.label}</a></li>`;
        });
      });
      navHtml += '</ul></nav>';
      
      // Theme toggle button
      const themeBtnLabel = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
      navHtml += `<button id="theme-toggle" class="theme-toggle-btn">${themeBtnLabel}</button>`;
      
      navPlaceholder.innerHTML = navHtml;

      // Theme toggle event listener
      document.getElementById('theme-toggle').addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.textContent = newTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
      });
    }
  });
})();
