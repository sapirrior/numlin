document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar-nav');
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-brand">numlin</div>
      <nav>
        <ul>
          <li><a href="index.html">Introduction</a></li>
          <li><a href="installation.html">Installation</a></li>
          <li><a href="creation.html">Creation</a></li>
          <li><a href="vector.html">Vector Class</a></li>
          <li><a href="matrix.html">Matrix Class</a></li>
          <li><a href="operations.html">Operations</a></li>
          <li><a href="statistics.html">Statistics</a></li>
        </ul>
      </nav>
    `;

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = sidebar.querySelectorAll('a');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }
});
