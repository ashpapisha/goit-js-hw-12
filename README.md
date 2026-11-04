# GOIT-JS-HW-12 — Image search. Синтаксис async/await і пагінація

Застосунок пошуку зображень через Pixabay API. Порівняно з попереднім модулем:
усі HTTP-запити переписані на `async/await`, з'явилася пагінація з кнопкою
**Load more** (по 15 зображень за запит), обробка кінця колекції через `totalHits`
і плавне прокручування сторінки до нових карток.

## Стек

- Vite — збірка проєкту
- Axios — HTTP-запити
- iziToast — сповіщення
- SimpleLightbox — модальний перегляд зображень

## Запуск

```bash
npm install
npm run dev
```

Значення API-ключа знаходиться у файлі `src/js/pixabay-api.js` (константа `API_KEY`).

## Збірка для GitHub Pages

```bash
npm run build
```

Результат — у папці `dist`, публікація автоматично через GitHub Actions.
