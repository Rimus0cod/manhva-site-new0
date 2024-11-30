const path = require('path');
const fs = require('fs');
const { listImages } = require('./gcs'); // Подключаем модуль работы с GCS

const totalChapters = 205; // Количество глав
const outputDir = path.join('C:/Users/diff/code/manhva-site/public/sololeveling/', 'chapters'); // Локальная папка для сохранения HTML

// Генерация HTML-шаблона
const template = (chapterNumber, images, prevChapter, nextChapter) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Глава ${chapterNumber}</title>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>  
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
  height: 90%;
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
display: flex;
  flex-direction: column;
    background: #171717;
  padding: 20px;
   padding-top: 15%;
  border-radius: 10px;
  max-width: 90%; /* Адаптация под экран */
  max-height: 90%; /* Ограничение высоты */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto; /* Прокрутка при переполнении */
  scrollbar-width: none;
  margin-left: 60%;
  width: 60vh;
  height: 100%;
  z-index: 1;
}

.modal-content a {
  display: inline-block;
  margin: 5px;
  padding: 10px 15px;
  text-decoration: none;
  background-color: #252525;
  color: #f6f6f6;
  border-radius: 5px;
  transition: .3s;
  opacity: 1;
}

.modal-content .current-chapter {
  background-color: #444; /* Новый цвет фона */
  color: #fff; /* Цвет текста */
  font-weight: bold; /* Выделение шрифта */
  cursor: default; /* Убираем указатель */
  pointer-events: none; /* Делаем не кликабельным */
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
    background-color: transparent;
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
  z-index: 9999;
}
    .logo-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Добавлено для адаптации */
  opacity: 999;
}
    .logo {
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
      opacity: 999;
      }
    .site-title {
      font-size: 18px;
      color: white;
      font-weight: 500;
      opacity: 999;
    }
    .header a {
      position: relative;
      font-size: 18px;
      color: white;
      font-weight: 500;
      text-decoration: none;
      margin-left: 40px;
      cursor: pointer;
      opacity: 999;
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
      opacity: 999;
    }
    .header i {
      font-size: 20px;
      opacity: 999;
    }
    .header a:hover::before {
      width: 100%;
      opacity: 999;
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
        transition: .4s;
    }
    .nav-bar a:hover {
      text-decoration: underline;
    }

    .nav-bar i {
    font-size: 20px;
    }
    
    .modal-content .current-chapter {
  background-color: #1976d2;
  color: #fff;          
  font-weight: bold;    
  cursor: default;      
  pointer-events: none;  
}
  </style>
</head>
<body>
  <header class="header">
    <nav>
      <div class="logo-container">
        <a href="/index.html"><img src="/public/image/logo.webp" alt="Logo" class="logo"></a>
        <a href="/index.html"><span class="site-title">Wabi & Sabi</span></a>
        <a href="/public/sololeveling/index.html">Solo Leveling</a>
      </div>
    </nav>
    <nav class="navbar">
      <a href="#">Закладки</a>
      <a href="#">User</a>
    </nav>
  </header>

<div id="chapterModal" class="modal">
  <div class="modal-content">
  <span class="close" onclick="closeModal()"></span>
  ${Array.from({ length: totalChapters }, (_, i) =>
  `<a href="../${i + 1}/index.html" class="${i + 1 === chapterNumber ? 'current-chapter' : ''}">Глава ${i + 1}</a>`
).join('')}
</div>
</div>
<div class="nav-bar">
    ${prevChapter ? `<a href="../${prevChapter}/index.html"><i class='bx bx-skip-previous'></i></a>` : '<span></span>'}
    <a href="#" id="openModalButton">${chapterNumber}</a>
    ${nextChapter ? `<a href="../${nextChapter}/index.html"><i class='bx bx-skip-next'></i></a>` : '<span></span>'}
  </div>
  <h1>Глава ${chapterNumber}</h1>

  <div class="images">
    ${images.map((img) => `<img src="https://storage.googleapis.com/chapters-for-manga/sololeveling-chapters/${chapterNumber}/images/${img}" alt="Страница">`).join('\n')}
  </div>

  
  <div class="nav-bar">
    ${prevChapter ? `<a href="../${prevChapter}/index.html"><i class='bx bx-skip-previous'></i></a>` : '<span></span>'}
    <a href="#" id="openModalButton">${chapterNumber}</a>
    ${nextChapter ? `<a href="../${nextChapter}/index.html"><i class='bx bx-skip-next'></i></a>` : '<span></span>'}
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