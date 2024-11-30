const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

// Укажите путь к вашему JSON-файлу с ключами
const keyFilePath = path.join('C:/Users/diff/code/manhva-site/', 'gcs-key.json');

// Инициализация клиента Google Cloud Storage
const storage = new Storage({
  keyFilename: keyFilePath,
  projectId: 'site-441614', // Укажите ваш Project ID
});

// Имя вашего бакета
const bucketName = 'chapters-for-manga';

// Функция получения списка изображений из бакета
async function listImages(chapterNumber) {
  const folderPath = `tokyo-ghoul:re-chapters/chapters/${chapterNumber}/images/`; // Путь к папке главы
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: folderPath });

  // Фильтруем только изображения
  return files
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.name))
    .map(file => file.name.replace(folderPath, '')); // Убираем путь к папке из имени
}

// Функция скачивания изображений
async function downloadImages(chapterNumber, localDir) {
  const folderPath = `tokyo-ghoul:re-chapters/chapters/${chapterNumber}/images/`;
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: folderPath });

  if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir, { recursive: true });
  }

  for (const file of files) {
    const localFilePath = path.join(localDir, path.basename(file.name));
    await file.download({ destination: localFilePath });
    console.log(`Скачано: ${file.name}`);
  }
}

module.exports = { listImages, downloadImages };