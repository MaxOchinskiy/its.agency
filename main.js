// === СЛАЙДЕР ===
function initSlider() {
    let sliderImages = [
        'image/rectangle.png',
        'image/photoMain.jpg',
        'image/photoMain2.jpg'
    ];
    let currentIndex = 0;
    let sliderImg = document.querySelector('.main-content__img img');
    let leftBtn = document.querySelector('.main-nav__chevron__left');
    let rightBtn = document.querySelector('.main-nav__chevron__right');

    function showSlide(index) {
        if (index < 0) index = sliderImages.length - 1;
        if (index >= sliderImages.length) index = 0;
        currentIndex = index;
        sliderImg.src = sliderImages[currentIndex];
        sliderImg.style.objectFit = 'cover'; // сохраняет пропорции
    }

    leftBtn.addEventListener('click', function () {
        showSlide(currentIndex - 1);
    });
    rightBtn.addEventListener('click', function () {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);
}

// === ДАННЫЕ ДЛЯ ТЕСТА ===
let products = [
    {
        id: 1,
        name: 'Краска Wallquest, Brownsone MS90102',
        price: 6000,
        img: 'image/img.png',
        type: 'НОВИНКИ'
    },
    {id: 2, name: 'Краска Wallquest, Brownsone MS90103', price: 7000, img: 'image/img_1.png', type: 'ЕСТЬ В НАЛИЧИИ'},
    {id: 3, name: 'Краска Wallquest, Brownsone MS90104', price: 8000, img: 'image/img_2.png', type: 'КОНТРАКТНЫЕ'},
    {id: 4, name: 'Краска Wallquest, Brownsone MS90105', price: 9000, img: 'image/img_3.png', type: 'ЭКСКЛЮЗИВНЫЕ'},
    {id: 5, name: 'Краска Wallquest, Brownsone MS90106', price: 5000, img: 'image/img_4.png', type: 'РАСПРОДАЖА'},
    {id: 6, name: 'Краска Wallquest, Brownsone MS90107', price: 4000, img: 'image/img_5.png', type: 'НОВИНКИ'},
    {id: 7, name: 'Краска Wallquest, Brownsone MS90108', price: 10000, img: 'image/img_6.png', type: 'НОВИНКИ'},
    {
        id: 8,
        name: 'Краска Wallquest, Brownsone MS90109',
        price: 3000,
        img: 'image/img_7.png',
        type: 'ЕСТЬ В НАЛИЧИИ'
    },
    {
        id: 9,
        name: 'Краска Wallquest, Brownsone MS90110',
        price: 9000,
        img: 'image/img_8.png',
        type: 'ЕСТЬ В НАЛИЧИИ'
    },
    {id: 10, name: 'Краска Wallquest, Brownsone MS90111', price: 2000, img: 'image/img_3.png', type: 'НОВИНКИ'},
    {id: 11, name: 'Краска Wallquest, Brownsone MS90112', price: 12000, img: 'image/img_9.png', type: 'НОВИНКИ'},
    {id: 12, name: 'Краска Wallquest, Brownsone MS90113', price: 800, img: 'image/img_4.png', type: 'НОВИНКИ'}
];

function renderProducts(list) {
    let productList = document.querySelector('.product-list');
    if (!productList) return;
    productList.innerHTML = '';
    list.forEach(function (product) {
        let card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-type', product.type);
        card.innerHTML =
            '<img alt="Product" class="product-card__img" src="' + product.img + '" style="width:278px;height:278px;object-fit:cover;">' +
            '<div class="product-card__desc">' + product.name + '</div>' +
            '<div class="product-card__footer">' +
            '<span class="product-card__price"><b>' + product.price + ' ₽</b></span>' +
            '<button aria-label="Добавить" class="product-card__add" type="button">' +
            // SVG по умолчанию
            '<svg class="svg-default" fill="none" height="32" viewBox="0 0 80 32" width="80" xmlns="http://www.w3.org/2000/svg">' +
            '<rect fill="#7BB899" height="32" rx="8" width="80"/>' +
            '<path d="M40 10.1666V21.8333" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
            '<path d="M34.167 16H45.8337" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
            '</svg>' +
            // SVG для мобилок
            '<svg class="svg-mobile" fill="none" height="24" viewBox="0 0 40 24" width="40" xmlns="http://www.w3.org/2000/svg">' +
            '<rect fill="#F2F2F2" height="24" rx="6" width="40"/>' +
            '<path d="M20 7.33331V16.6666" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
            '<path d="M15.333 12H24.6663" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
            '</svg>' +
            '</button>' +
            '</div>';
        productList.appendChild(card);
    });
}

function getFilteredAndSortedProducts() {
    let checked = document.querySelector('.filter-item input[type="radio"]:checked');
    let type = checked ? checked.parentNode.textContent.trim().toUpperCase() : null;
    let filtered = type ? products.filter(function (product) {
        return product.type === type;
    }) : products.slice();
    let selectedSort = document.querySelector('.custom-select__option--active');
    let sortType = selectedSort ? selectedSort.textContent : '';
    let sorted = filtered.slice();
    if (sortType.trim() === 'СНАЧАЛА ДОРОГИЕ') {
        sorted.sort(function (a, b) {
            return b.price - a.price;
        });
        console.log('Сортировка: ДОРОГИЕ', sorted.map(function (p) {
            return p.price;
        }));
    } else if (sortType.trim() === 'СНАЧАЛА НЕДОРОГИЕ') {
        sorted.sort(function (a, b) {
            return a.price - b.price;
        });
        console.log('Сортировка: НЕДОРОГИЕ', sorted.map(function (p) {
            return p.price;
        }));
    } else {
        console.log('Без сортировки', sorted.map(function (p) {
            return p.price;
        }));
    }
    return sorted;
}

function sortProducts() {
    let list = getFilteredAndSortedProducts();
    renderProducts(list);
    initCart();
}

function filterProducts() {
    let list = getFilteredAndSortedProducts();
    renderProducts(list);
    initCart();
}

// === КОРЗИНА ===
let cart = [];

function openCartModal() {
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCart() {
    let cartItems = document.getElementById('cartItems');
    let cartTotal = document.getElementById('cartTotal');
    let cartCount = document.getElementById('cartCount');
    let cartTotalCount = document.getElementById('cartTotalCount');
    let cartTotalCountHeader = document.getElementById('cartTotalCountHeader');
    if (!cartItems || !cartTotal) return;

    let totalCount = cart.reduce(function (sum, item) {
        return sum + item.count;
    }, 0);
    if (cartCount) cartCount.textContent = totalCount ? totalCount : '';
    if (cartTotalCount) cartTotalCount.textContent = totalCount ? (totalCount + ' товара') : '';
    if (cartTotalCountHeader) cartTotalCountHeader.textContent = totalCount ? totalCount : '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        cartTotal.textContent = '0 ₽';
        if (cartTotalCount) cartTotalCount.textContent = '';
        return;
    }
    let total = 0;
    cartItems.innerHTML = '';
    cart.forEach(function (item, idx) {
        total += item.price * item.count;
        let div = document.createElement('div');
        div.className = 'cart-modal__item';
        div.innerHTML =
            '<div class="cart-modal__top">' +
            '<img src="' + item.img + '" alt="">' +
            '<span>' +
            item.name +
            '<b>' + item.price + ' ₽</b>' +
            '</span>' +
            '<div class="cart-modal__qty">' +
            '<button class="cart-modal__qty-btn" data-idx="' + idx + '" data-action="minus">–</button>' +
            '<span class="cart-modal__qty-value">' + item.count + '</span>' +
            '<button class="cart-modal__qty-btn" data-idx="' + idx + '" data-action="plus">+</button>' +
            '</div>' +
            '<button class="cart-modal__remove" data-idx="' + idx + '" title="Удалить">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<g opacity="0.2">\n' +
            '<path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>\n' +
            '<path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>\n' +
            '</g>\n' +
            '</svg>' +
            '</button>';
        cartItems.appendChild(div);
    });
    cartTotal.textContent = total + ' ₽';


    cartItems.querySelectorAll('.cart-modal__qty-btn').forEach(function (btn) {
        btn.onclick = function () {
            let idx = parseInt(btn.getAttribute('data-idx'));
            let action = btn.getAttribute('data-action');
            if (action === 'plus') cart[idx].count++;
            if (action === 'minus' && cart[idx].count > 1) cart[idx].count--;
            renderCart();
        };
    });
    cartItems.querySelectorAll('.cart-modal__remove').forEach(function (btn) {
        btn.onclick = function () {
            let idx = parseInt(btn.getAttribute('data-idx'));
            cart.splice(idx, 1);
            renderCart();
        };
    });
}

function initCartModal() {
    let cartBtn = document.querySelector('.header__menu__cart');
    let closeBtn = document.getElementById('cartModalClose');
    let overlay = document.getElementById('cartModalOverlay');
    let clearBtn = document.getElementById('cartModalClear');
    if (cartBtn) cartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        renderCart();
        openCartModal();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeCartModal);
    if (overlay) overlay.addEventListener('click', closeCartModal);
    if (clearBtn) clearBtn.addEventListener('click', function () {
        cart.length = 0;
        renderCart();
    });
}

function initCart() {
    let addToCartBtns = document.querySelectorAll('.product-card__add');
    addToCartBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let card = btn.closest('.product-card');
            addToCart(card);
        });
    });
}

function addToCart(card) {
    let name = card.querySelector('.product-card__desc').textContent;
    let price = parseInt(card.querySelector('.product-card__price').textContent);
    let img = card.querySelector('img').src;
    let id = name + price; // уникальный id на основе имени и цены
    let item = cart.find(function (i) {
        return i.id === id;
    });
    if (item) {
        item.count++;
    } else {
        cart.push({id: id, name: name, price: price, img: img, count: 1});
    }
    renderCart();
}


// === МОДАЛЬНЫЕ ОКНА ===
function initModals() {
    // Открытие/закрытие корзины, фильтров, меню на мобильном
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav.header-nav');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
});

function initFilters() {
    let filterItems = document.querySelectorAll('.filter-item input[type="radio"]');
    filterItems.forEach(function (item) {
        item.addEventListener('change', function () {
            filterProducts();
        });
    });
}

function initSort() {
    let customSelect = document.querySelector('.custom-select.main-nav__sort__catalog__text');
    if (!customSelect) return;
    let selected = customSelect.querySelector('.custom-select__selected');
    let options = customSelect.querySelectorAll('.custom-select__option');
    let sortOverlay = document.getElementById('sortOverlay');

    selected.addEventListener('click', function (e) {
        e.stopPropagation();
        let isOpen = customSelect.classList.contains('open');
        customSelect.classList.toggle('open');
        if (!isOpen && sortOverlay) sortOverlay.style.display = 'block';
        else if (isOpen && sortOverlay) sortOverlay.style.display = 'none';
    });


    options.forEach(function (option) {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            options.forEach(function (opt) {
                opt.classList.remove('custom-select__option--active');
            });
            option.classList.add('custom-select__option--active');
            selected.textContent = option.textContent;
            customSelect.classList.remove('open');
            if (sortOverlay) sortOverlay.style.display = 'none';
            sortProducts();
        });
    });

    document.addEventListener('click', function (e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
            if (sortOverlay) sortOverlay.style.display = 'none';
        }
    });
    if (sortOverlay) {
        sortOverlay.addEventListener('click', function () {
            customSelect.classList.remove('open');
            sortOverlay.style.display = 'none';
        });
    }
}

function initFilterModal() {
    let openBtn = document.getElementById('filterOpenBtn');
    let modal = document.getElementById('filterModal');
    let overlay = document.getElementById('filterOverlay');
    let closeBtn = document.getElementById('filterModalClose');
    if (openBtn) openBtn.addEventListener('click', function () {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });
    if (closeBtn) closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
    if (overlay) overlay.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}

function initMenuModal() {
    let openBtn = document.getElementById('menuOpenBtn');
    let modal = document.getElementById('menuModal');
    let overlay = document.getElementById('menuOverlay');
    let closeBtn = document.getElementById('menuModalClose');
    if (openBtn) openBtn.addEventListener('click', function () {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });
    if (closeBtn) closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
    if (overlay) overlay.addEventListener('click', function () {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });
}


document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    initFilters();
    initSort();
    renderProducts(products);
    initCart();
    initModals();
    initCartModal();
    initFilterModal();
    initMenuModal();
});

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('burgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (burger && mobileNav) {
        burger.addEventListener('click', function () {
            mobileNav.classList.toggle('open');
        });
        mobileNav.addEventListener('click', function (e) {
            // Закрывать только если клик по затемнённой области, а не по панели меню
            if (e.target === mobileNav) {
                mobileNav.classList.remove('open');
            }
        });
    }
}); 