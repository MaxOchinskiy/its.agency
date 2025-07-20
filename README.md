## Технологии

- **HTML**: Pug шаблонизатор
- **CSS**: Sass/SCSS
- **JavaScript**: ES5/ES6 (чистый JS)
- **API**: MockAPI для тестовых данных
- **Библиотеки**: Axios для HTTP запросов

## Структура проекта

```
├── index.pug          # Pug шаблон
├── index.html         # Скомпилированный HTML
├── main.js            # Основная логика
├── style/
│   ├── style.scss     # Главный SCSS файл
│   ├── style.css      # Скомпилированный CSS
│   ├── header.scss    # Стили заголовка
│   ├── main.scss      # Стили главной страницы
│   ├── product.scss   # Стили товаров
│   ├── cartModal.scss # Стили модального окна корзины
│   └── media.scss     # Медиа-запросы
├── image/             # Изображения
└── package.json       # Зависимости и скрипты
```

## Установка и запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите режим разработки (компиляция Pug и Sass в режиме наблюдения):

```bash
npm run dev
```

3. Или запустите отдельные процессы:

```bash
# Компиляция Pug
npm run pug:watch

# Компиляция Sass
npm run sass:watch
```

## Доступные команды

- `npm run dev` - Запуск режима разработки (Pug + Sass)
- `npm run pug:watch` - Компиляция Pug в режиме наблюдения
- `npm run pug:build` - Одноразовая компиляция Pug
- `npm run sass:watch` - Компиляция Sass в режиме наблюдения
- `npm run build` - Полная сборка проекта (Pug + Sass)

## Особенности реализации

### БЭМ методология

Все классы следуют БЭМ методологии:

- `header-content__logo-img`
- `main-content__img`
- `cart-modal__item`
- `product-card__add`

### Сохранение пропорций изображений

Используется `object-fit` для сохранения пропорций изображений при изменении размера экрана.

### Компонентный подход

JavaScript код организован в функции-компоненты:

- `createProductCard()`
- `createCartItem()`
- `renderFilterList()`

### API интеграция

Используется MockAPI для получения тестовых данных о товарах.
