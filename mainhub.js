document.documentElement.dataset.page = 'mainhub';

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function applyProjectFilter(filterValue) {
  const normalizedFilter = filterValue || 'all';

  filterButtons.forEach((button) => {
    const matches = button.getAttribute('data-filter') === normalizedFilter;
    button.classList.toggle('active', matches);
    button.setAttribute('aria-pressed', String(matches));
  });

  projectCards.forEach((card) => {
    const matchesFilter = normalizedFilter === 'all' || card.getAttribute('data-category') === normalizedFilter;
    card.classList.toggle('hide', !matchesFilter);
  });
}

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyProjectFilter(button.getAttribute('data-filter')));
  });

  applyProjectFilter('all');
}

document.querySelectorAll('[data-filter-link]').forEach((link) => {
  link.addEventListener('click', () => applyProjectFilter(link.getAttribute('data-filter-link')));
});
