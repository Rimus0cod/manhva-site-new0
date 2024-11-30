// Получаем все вкладки и содержимое
const tabs = document.querySelectorAll('.slider-tab');
const contents = document.querySelectorAll('.slider-content');

// Добавляем обработчики событий для вкладок
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Убираем активные классы у всех вкладок и содержимого
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Добавляем активный класс к текущей вкладке и её содержимому
        tab.classList.add('active');
        const target = document.getElementById(tab.getAttribute('data-target'));
        target.classList.add('active');
    });
});

const btn = document.querySelector('.more')
const text = document.querySelector('.hidden-text')

btn.addEventListener('click', () => {
    // Проверяем, скрыт ли текст
    if (text.style.display === 'none') {
      text.style.display = 'inline'; // Показываем текст
      btn.textContent = 'Меньше';   // Меняем текст кнопки
    } else {
      text.style.display = 'none';  // Скрываем текст
      btn.textContent = 'Больше';   // Меняем текст кнопки обратно
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const chapterList = document.getElementById("chapter-list");
    const showMoreButton = document.getElementById("show-more");
    const hideMoreButton = document.getElementById("hide-more");
  
    const totalChapters = 145; // Общее количество глав
    const visibleChapters = 5; // Количество глав, которые отображаются сразу
  
    const baseURL = "http://127.0.0.1:5500/public/tokyo%20ghoul/chapters/"; // Базовый URL для всех глав
  
    // Создаем список глав с вложенными ссылками
    for (let i = 1; i <= totalChapters; i++) {
      const chapter = document.createElement("div");
      chapter.classList.add("chapter");
      if (i > visibleChapters) {
        chapter.classList.add("hidden");
      }
  
      const link = document.createElement("a");
      link.href = `${baseURL}${i}/index.html`; // Генерация ссылки для каждой главы
      link.textContent = `Глава ${i}`;
      chapter.appendChild(link);
  
      chapterList.appendChild(chapter);
    }
  
    // Показать остальные главы
    showMoreButton.addEventListener("click", () => {
      const hiddenChapters = document.querySelectorAll(".chapter.hidden");
      hiddenChapters.forEach(chapter => {
        chapter.classList.remove("hidden");
      });
      showMoreButton.classList.add("hidden");
      hideMoreButton.classList.remove("hidden");
    });
  
    // Скрыть дополнительные главы
    hideMoreButton.addEventListener("click", () => {
      const chapters = document.querySelectorAll(".chapter");
      chapters.forEach((chapter, index) => {
        if (index + 1 > visibleChapters) {
          chapter.classList.add("hidden");
        }
      });
      showMoreButton.classList.remove("hidden");
      hideMoreButton.classList.add("hidden");
    });
  });