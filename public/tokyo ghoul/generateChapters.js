const path = require('path');
const fs = require('fs');
const { listImages } = require('./gcs'); // Подключаем модуль работы с GCS

const totalChapters = 145; // Количество глав
const outputDir = path.join('C:/Users/diff/code/manhva-site/public/tokyo ghoul/', 'chapters'); // Локальная папка для сохранения HTML

// Генерация HTML-шаблона
const template = (chapterNumber, images, prevChapter, nextChapter) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Глава ${chapterNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #171717;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

.modal {
  display: flex; /* Flex-контейнер */
  visibility: hidden; /* Скрыто по умолчанию */
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  opacity: 0; /* Начальное состояние: невидимое */
  transform: scale(0.9); /* Уменьшенный размер для эффекта появления */
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0s linear 0.3s;
}

.modal.show {
  visibility: visible; /* Делает модальное окно видимым */
  opacity: 1; /* Плавное появление */
  transform: scale(1); /* Нормальный размер */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Плавный переход */
}

.modal-content {
 background: rgb(116,116,116);
background: linear-gradient(180deg, rgba(116,116,116,0.9626225490196079) 0%, rgba(172,172,172,0.9542191876750701) 24%, rgba(147,147,147,0.9598214285714286) 70%, rgba(199,199,199,0.9458158263305322) 95%);
  padding: 20px;
  border-radius: 10px;
  max-width: 90%; /* Адаптация под экран */
  max-height: 80%; /* Ограничение высоты */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto; /* Прокрутка при переполнении */
}

.modal-content a {
  display: inline-block;
  margin: 5px;
  padding: 10px 15px;
  text-decoration: none;
  background-color: #1a1a1a;
  color: #f6f6f6;
  border-radius: 5px;
  transition: .3s;
}

.modal-content a:hover {
  background-color: #444;
}

.close {
  cursor: pointer;
  color: #aaa;
  font-size: 20px;
  float: right;
}

#openModalButton {
display: flex;
justify-content: flex-end;
padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    transition: .5s ease;
}
 #openModalButton:hover {
 background-color: #444;
 color: #fff;
 }   
    h1 {
      text-align: center;
      margin: 20px 0;
    }
    .images {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 100%; /* Убедились, что не выходим за пределы */
  width: 100%;
  box-sizing: border-box;
}
    .images img {
  max-width: 100%;
  height: auto; /* Убедились, что изображения не растягиваются */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
    .header {
  position: relative;  
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px; /* Уменьшили padding */
  background-color: #121212;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box; /* Убедились, что padding включён в размеры */
}
    .logo-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Добавлено для адаптации */
}
    .logo {
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .site-title {
      font-size: 18px;
      color: white;
      font-weight: 500;
    }
    .header a {
      position: relative;
      font-size: 18px;
      color: white;
      font-weight: 500;
      text-decoration: none;
      margin-left: 40px;
      cursor: pointer;
    }
    .header a::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 0;
      height: 2px;
      background: white;
      transition: 0.3s;
    }
    .header i {
      font-size: 20px;
    }
    .header a:hover::before {
      width: 100%;
    }
    .nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px;
  flex-wrap: wrap; /* Добавлено для переноса элементов */
}
    .nav-bar a {
      color: white;
      text-decoration: none;
      font-size: 18px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .nav-bar a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <header class="header">
    <nav>
      <div class="logo-container">
        <a href="/index.html"><img src="/public/image/logo.webp" alt="Logo" class="logo"></a>
        <a href="/index.html"><span class="site-title">Wabi & Sabi</span></a>
        <a href="/public/tokyo ghoul/index.html">Tokyo Ghoul</a>
      </div>
    </nav>
    <nav class="navbar">
      <a href="#">Закладки</a>
      <a href="#">User</a>
    </nav>
  </header>
<button id="openModalButton">Все главы</button>

<div id="chapterModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal()">×</span>
    <h2>Доступные главы</h2>
    ${Array.from({ length: totalChapters }, (_, i) =>
      `<a href="../${i + 1}/index.html">Глава ${i + 1}</a>`
    ).join('')}
  </div>
</div>
<div class="nav-bar">
    ${prevChapter ? `<a href="../${prevChapter}/index.html"><i class='bx bx-skip-previous'></i>prew</a>` : '<span></span>'}
    <a href="./index.html">${chapterNumber}</a>
    ${nextChapter ? `<a href="../${nextChapter}/index.html">next<i class='bx bx-skip-next'></i></a>` : '<span></span>'}
  </div>
  <h1>Глава ${chapterNumber}</h1>
  <div class="images">
    ${images.map((img) => `<img src="https://storage.googleapis.com/chapters-for-manga/tokyo-ghoul-chapters/${chapterNumber}/images/${img}" alt="Страница">`).join('\n')}
  </div>

  <div id="chapterModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal()">×</span>
      <h2>Доступные главы</h2>
      ${Array.from({ length: totalChapters }, (_, i) => `<a href="../${i + 1}/index.html">Глава ${i + 1}</a>`).join('')}
    </div>
  </div>
  <div class="nav-bar">
    ${prevChapter ? `<a href="../${prevChapter}/index.html"><i class='bx bx-skip-previous'></i>prew</a>` : '<span></span>'}
    <a href="./index.html">${chapterNumber}</a>
    ${nextChapter ? `<a href="../${nextChapter}/index.html">next<i class='bx bx-skip-next'></i></a>` : '<span></span>'}
  </div>
<script>
    // Получение кнопки и модального окна
const openModalButton = document.getElementById('openModalButton');
const chapterModal = document.getElementById('chapterModal');

// Функция для открытия модального окна
function openModal() {
  chapterModal.classList.add('show');
}

// Функция для закрытия модального окна
function closeModal() {
  chapterModal.classList.remove('show');
}

// Добавление обработчиков событий
openModalButton.addEventListener('click', openModal);

// Закрытие окна при клике вне содержимого модального окна
chapterModal.addEventListener('click', (event) => {
  if (event.target === chapterModal) {
    closeModal();
  }
});
  </script>
</body>
</html>
`;

// Основная логика генерации страниц
(async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 1; i <= totalChapters; i++) {
    console.log(`Обработка главы ${i}`);

    // Получаем список изображений из GCS
    const images = await listImages(i);

    if (images.length === 0) {
      console.warn(`Глава ${i} пропущена: изображения не найдены.`);
      continue;
    }

    // Определяем номера предыдущей и следующей главы
    const prevChapter = i > 1 ? i - 1 : null;
    const nextChapter = i < totalChapters ? i + 1 : null;

    // Генерируем HTML-контент
    const htmlContent = template(i, images, prevChapter, nextChapter);

    // Путь для сохранения HTML-файла
    const chapterDir = path.join(outputDir, `${i}`);
    if (!fs.existsSync(chapterDir)) {
      fs.mkdirSync(chapterDir, { recursive: true });
    }

    fs.writeFileSync(path.join(chapterDir, 'index.html'), htmlContent, 'utf-8');
    console.log(`Глава ${i} успешно создана.`);
  }
})();