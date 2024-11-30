const addBookmarkButton = document.getElementById('addBookmark');

addBookmarkButton.addEventListener('click', () => {
  const workId = addBookmarkButton.dataset.workId; // ID произведения
  const workTitle = addBookmarkButton.dataset.workTitle; // Название произведения

  // Получаем существующие закладки
  let bookmarks = JSON.parse(localStorage.getItem('worksBookmarks')) || [];

  // Проверяем, существует ли уже закладка
  const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark.id === workId);

  if (!isAlreadyBookmarked) {
    // Добавляем произведение в закладки
    bookmarks.push({ id: workId, title: workTitle });
    localStorage.setItem('worksBookmarks', JSON.stringify(bookmarks));
    alert(`${workTitle} добавлено в закладки!`);
  } else {
    alert('Это произведение уже есть в закладках.');
  }
});