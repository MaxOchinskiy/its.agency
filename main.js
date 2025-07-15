// === СЛАЙДЕР ===
function initSlider() {
    var sliderImages = [
        'image/rectangle.png',
        'image/frame.png',
        'image/sliceFhoto.png'
    ];
    var currentIndex = 0;
    var sliderImg = document.querySelector('.main-content__img img');
    var leftBtn = document.querySelector('.main-nav__chevron__left');
    var rightBtn = document.querySelector('.main-nav__chevron__right');

    function showSlide(index) {
        if (index < 0) index = sliderImages.length - 1;
        if (index >= sliderImages.length) index = 0;
        currentIndex = index;
        sliderImg.src = sliderImages[currentIndex];
        sliderImg.style.width = '1920px';
        sliderImg.style.height = '560px';
        sliderImg.style.objectFit = 'cover'; // сохраняет пропорции
    }

    leftBtn.addEventListener('click', function() {
        showSlide(currentIndex - 1);
    });
    rightBtn.addEventListener('click', function() {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);
}

// === ДАННЫЕ ДЛЯ ТЕСТА ===
var products = [
    { id: 1, name: 'Краска Wallquest, Brownsone MS90102', price: 6000, img: 'image/rectangle.png', type: 'НОВИНКИ' },
    { id: 2, name: 'Краска Wallquest, Brownsone MS90103', price: 7000, img: 'image/frame.png', type: 'ЕСТЬ В НАЛИЧИИ' },
    { id: 3, name: 'Краска Wallquest, Brownsone MS90104', price: 8000, img: 'image/sliceFhoto.png', type: 'КОНТРАКТНЫЕ' },
    { id: 4, name: 'Краска Wallquest, Brownsone MS90105', price: 9000, img: 'image/rectangle.png', type: 'ЭКСКЛЮЗИВНЫЕ' },
    { id: 5, name: 'Краска Wallquest, Brownsone MS90106', price: 5000, img: 'image/frame.png', type: 'РАСПРОДАЖА' },
    { id: 6, name: 'Краска Wallquest, Brownsone MS90107', price: 4000, img: 'image/rectangle.png', type: 'НОВИНКИ' },
    { id: 7, name: 'Краска Wallquest, Brownsone MS90108', price: 10000, img: 'image/frame.png', type: 'НОВИНКИ' },
    { id: 8, name: 'Краска Wallquest, Brownsone MS90109', price: 3000, img: 'image/sliceFhoto.png', type: 'ЕСТЬ В НАЛИЧИИ' },
    { id: 9, name: 'Краска Wallquest, Brownsone MS90110', price: 9000, img: 'image/rectangle.png', type: 'ЕСТЬ В НАЛИЧИИ' },
    { id: 10, name: 'Краска Wallquest, Brownsone MS90111', price: 2000, img: 'image/rectangle.png', type: 'НОВИНКИ' },
    { id: 11, name: 'Краска Wallquest, Brownsone MS90112', price: 12000, img: 'image/frame.png', type: 'НОВИНКИ' },
    { id: 12, name: 'Краска Wallquest, Brownsone MS90113', price: 800, img: 'image/sliceFhoto.png', type: 'НОВИНКИ' }
];

function renderProducts(list) {
    var productList = document.querySelector('.product-list');
    if (!productList) return;
    productList.innerHTML = '';
    list.forEach(function(product) {
        var card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-type', product.type);
        card.innerHTML =
            '<img alt="Product" class="product-card__img" src="' + product.img + '" style="width:278px;height:278px;object-fit:cover;">' +
            '<div class="product-card__desc">' + product.name + '</div>' +
            '<div class="product-card__footer">' +
                '<span class="product-card__price"><b>' + product.price + ' ₽</b></span>' +
                '<button aria-label="Добавить" class="product-card__add" type="button">' +
                    '<svg fill="none" height="32" viewBox="0 0 80 32" width="80" xmlns="http://www.w3.org/2000/svg">' +
                        '<rect fill="#7BB899" height="32" rx="8" width="80"/>' +
                        '<path d="M40 10.1666V21.8333" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
                        '<path d="M34.167 16H45.8337" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
                    '</svg>' +
                '</button>' +
            '</div>' +
            '<hr/>';
        productList.appendChild(card);
    });
}

function getFilteredAndSortedProducts() {
    var checked = document.querySelector('.filter-item input[type="radio"]:checked');
    var type = checked ? checked.parentNode.textContent.trim().toUpperCase() : null;
    var filtered = type ? products.filter(function(product) { return product.type === type; }) : products.slice();
    var selectedSort = document.querySelector('.custom-select__option--active');
    var sortType = selectedSort ? selectedSort.textContent : '';
    var sorted = filtered.slice();
    if (sortType.trim() === 'СНАЧАЛА ДОРОГИЕ') {
        sorted.sort(function(a, b) { return b.price - a.price; });
        console.log('Сортировка: ДОРОГИЕ', sorted.map(function(p){return p.price;}));
    } else if (sortType.trim() === 'СНАЧАЛА НЕДОРОГИЕ') {
        sorted.sort(function(a, b) { return a.price - b.price; });
        console.log('Сортировка: НЕДОРОГИЕ', sorted.map(function(p){return p.price;}));
    } else {
        console.log('Без сортировки', sorted.map(function(p){return p.price;}));
    }
    return sorted;
}

function sortProducts() {
    var list = getFilteredAndSortedProducts();
    renderProducts(list);
    initCart();
}

function filterProducts() {
    var list = getFilteredAndSortedProducts();
    renderProducts(list);
    initCart();
}

// === КОРЗИНА ===
var cart = [];

function openCartModal() {
    document.getElementById('cartModal').style.display = 'flex';
}
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCart() {
    var cartItems = document.getElementById('cartItems');
    var cartTotal = document.getElementById('cartTotal');
    var cartCount = document.getElementById('cartCount');
    if (!cartItems || !cartTotal) return;
    if (cartCount) cartCount.textContent = cart.length ? cart.length + ' товара' : '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        cartTotal.textContent = '0 ₽';
        return;
    }
    var total = 0;
    cartItems.innerHTML = '';
    cart.forEach(function(item, idx) {
        total += item.price * item.count;
        var div = document.createElement('div');
        div.className = 'cart-modal__item';
        div.innerHTML =
            '<img src="' + item.img + '" alt="" />' +
            '<span>' + item.name + '</span>' +
            '<b>' + item.price + ' ₽</b>' +
            '<div class="cart-modal__qty">' +
                '<button class="cart-modal__qty-btn" data-idx="' + idx + '" data-action="minus">–</button>' +
                '<span class="cart-modal__qty-value">' + item.count + '</span>' +
                '<button class="cart-modal__qty-btn" data-idx="' + idx + '" data-action="plus">+</button>' +
            '</div>' +
            '<button class="cart-modal__remove" data-idx="' + idx + '" title="Удалить">×</button>';
        cartItems.appendChild(div);
    });
    cartTotal.textContent = total + ' ₽';

    // Обработчики +/-, удалить
    cartItems.querySelectorAll('.cart-modal__qty-btn').forEach(function(btn) {
        btn.onclick = function() {
            var idx = parseInt(btn.getAttribute('data-idx'));
            var action = btn.getAttribute('data-action');
            if (action === 'plus') cart[idx].count++;
            if (action === 'minus' && cart[idx].count > 1) cart[idx].count--;
            renderCart();
        };
    });
    cartItems.querySelectorAll('.cart-modal__remove').forEach(function(btn) {
        btn.onclick = function() {
            var idx = parseInt(btn.getAttribute('data-idx'));
            cart.splice(idx, 1);
            renderCart();
        };
    });
}

function initCartModal() {
    var cartBtn = document.querySelector('.header__menu__cart');
    var closeBtn = document.getElementById('cartModalClose');
    var overlay = document.getElementById('cartModalOverlay');
    var clearBtn = document.getElementById('cartModalClear'); // добавлено
    if (cartBtn) cartBtn.addEventListener('click', function(e) { e.preventDefault(); renderCart(); openCartModal(); });
    if (closeBtn) closeBtn.addEventListener('click', closeCartModal);
    if (overlay) overlay.addEventListener('click', closeCartModal);
    if (clearBtn) clearBtn.addEventListener('click', function() {
        cart.length = 0;
        renderCart();
    });
}

function initCart() {
    var addToCartBtns = document.querySelectorAll('.product-card__add');
    addToCartBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = btn.closest('.product-card');
            addToCart(card);
        });
    });
}

function addToCart(card) {
    var name = card.querySelector('.product-card__desc').textContent;
    var price = parseInt(card.querySelector('.product-card__price').textContent);
    var img = card.querySelector('img').src;
    var id = name + price; // уникальный id на основе имени и цены
    var item = cart.find(function(i) { return i.id === id; });
    if (item) {
        item.count++;
    } else {
        cart.push({ id: id, name: name, price: price, img: img, count: 1 });
    }
    renderCart();
}

function updateCartItemQuantity(productId, quantity) {
    // Изменение количества товара в корзине
}

function removeFromCart(productId) {
    // Удаление товара из корзины
}

function calculateCartTotal() {
    // Расчёт стоимости всех товаров в корзине
}

// === МОДАЛЬНЫЕ ОКНА ===
function initModals() {
    // Открытие/закрытие корзины, фильтров, меню на мобильном
}

function initFilters() {
    var filterItems = document.querySelectorAll('.filter-item input[type="radio"]');
    filterItems.forEach(function(item) {
        item.addEventListener('change', function() {
            filterProducts();
        });
    });
}

function initSort() {
    var customSelect = document.querySelector('.custom-select.main-nav__sort__catalog__text');
    if (!customSelect) return;
    var selected = customSelect.querySelector('.custom-select__selected');
    var dropdown = customSelect.querySelector('.custom-select__dropdown');
    var options = customSelect.querySelectorAll('.custom-select__option');
    var sortOverlay = document.getElementById('sortOverlay');

    // Открытие/закрытие выпадающего списка
    selected.addEventListener('click', function(e) {
        e.stopPropagation();
        var isOpen = customSelect.classList.contains('open');
        customSelect.classList.toggle('open');
        if (!isOpen && sortOverlay) sortOverlay.style.display = 'block';
        else if (isOpen && sortOverlay) sortOverlay.style.display = 'none';
    });

    // Выбор опции
    options.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            options.forEach(function(opt) {
                opt.classList.remove('custom-select__option--active');
            });
            option.classList.add('custom-select__option--active');
            selected.textContent = option.textContent;
            customSelect.classList.remove('open');
            if (sortOverlay) sortOverlay.style.display = 'none';
            sortProducts();
        });
    });

    // Закрытие по клику вне селекта
    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
            if (sortOverlay) sortOverlay.style.display = 'none';
        }
    });
    if (sortOverlay) {
        sortOverlay.addEventListener('click', function() {
            customSelect.classList.remove('open');
            sortOverlay.style.display = 'none';
        });
    }
}

function initFilterModal() {
    var openBtn = document.getElementById('filterOpenBtn');
    var modal = document.getElementById('filterModal');
    var overlay = document.getElementById('filterOverlay');
    var closeBtn = document.getElementById('filterModalClose');
    if (openBtn) openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });
    if (closeBtn) closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
    if (overlay) overlay.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}

function initMenuModal() {
    var openBtn = document.getElementById('menuOpenBtn');
    var modal = document.getElementById('menuModal');
    var overlay = document.getElementById('menuOverlay');
    var closeBtn = document.getElementById('menuModalClose');
    if (openBtn) openBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });
    if (closeBtn) closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
    if (overlay) overlay.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initFilters();
    initSort();
    renderProducts(products); // СНАЧАЛА рендерим карточки!
    initCart();               // ПОТОМ навешиваем обработчики!
    initModals();
    initCartModal();
    initFilterModal(); // добавлено
    initMenuModal();   // добавлено
}); 