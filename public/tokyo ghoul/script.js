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
    const totalChapters = 145;
    const chaptersPerLoad = 10;
    let loadedChapters = 0;
  
    // Функция для загрузки глав
    function loadChapters() {
      const fragment = document.createDocumentFragment();
      const start = loadedChapters + 1;
      const end = Math.min(loadedChapters + chaptersPerLoad, totalChapters);
  
      for (let i = start; i <= end; i++) {
        const chapter = document.createElement("div");
        chapter.classList.add("chapter");
  
        const link = document.createElement("a");
        link.href = `http://127.0.0.1:5500/public/tokyo%20ghoul/chapters/${i}/index.html`;
        link.textContent = `Глава ${i}`;
  
        chapter.appendChild(link);
        fragment.appendChild(chapter);
      }
  
      chapterList.appendChild(fragment);
      loadedChapters = end;
    }
  
    // Загрузка первых глав:
    loadChapters();
  
    // Обработчик события прокрутки
    chapterList.addEventListener("scroll", () => {
      const scrollBuffer = 10; // Запас в пикселях для обработки последней прокрутки
      if (
        chapterList.scrollTop + chapterList.clientHeight >=
        chapterList.scrollHeight - scrollBuffer
      ) {
        if (loadedChapters < totalChapters) {
          loadChapters();
        }
      }
    });
  });    

  chapterList.addEventListener("scroll", () => {
    console.log("Scroll Top:", chapterList.scrollTop);
    console.log("Client Height:", chapterList.clientHeight);
    console.log("Scroll Height:", chapterList.scrollHeight);
  
    const scrollBuffer = 10; // Запас для последних пикселей
    if (
      chapterList.scrollTop + chapterList.clientHeight >=
      chapterList.scrollHeight - scrollBuffer
    ) {
      if (loadedChapters < totalChapters) {
        loadChapters();
      }
    }
  });