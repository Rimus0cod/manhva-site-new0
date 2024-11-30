const bookmarkList = document.getElementById('bookmarkList');
const bookmarks = JSON.parse(localStorage.getItem('worksBookmarks')) || [];

if (bookmarks.length === 0) {
    bookmarkList.textContent = 'Закладок нет.';
} else {
    bookmarks.forEach((bookmark) => {
        // Контейнер для одной закладки
        const bookmarkItem = document.createElement('div');
        bookmarkItem.classList.add('bookmark-item'); // Добавляем класс для кастомизации

        // Изображение
        const img = document.createElement('img');
        img.src = bookmark.image; // Путь к изображению (например, `bookmark.image`)
        img.alt = bookmark.title; // Альтернативный текст
        img.classList.add('bookmark-image'); // Добавляем класс для изображения

        // Ссылка
        const link = document.createElement('a');
        link.href = `/works/${bookmark.id}`; // Ссылка на страницу произведения
        link.textContent = bookmark.title; // Отображение названия произведения
        link.classList.add('bookmark-link'); // Добавляем класс для ссылки

        // Добавляем элементы в контейнер закладки
        bookmarkItem.appendChild(img);
        bookmarkItem.appendChild(link);

        // Добавляем закладку в список
        bookmarkList.appendChild(bookmarkItem);
    });
}