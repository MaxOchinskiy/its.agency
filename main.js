// === СЛАЙДЕР ===
function initSlider() {
    console.log('initSlider called');
    let sliderImages = [
        'image/rectangle.png',
        'image/photoMain.jpg',
        'image/photoMain2.jpg'
    ];
    let currentIndex = 0;
    let sliderImg = document.querySelector('.main-content__img img');
    let leftBtn = document.querySelector('.main-nav__chevron__left');
    let rightBtn = document.querySelector('.main-nav__chevron__right');
    let dotsContainer = document.querySelector('.main-slider-dots');
    console.log('sliderImg:', sliderImg, 'leftBtn:', leftBtn, 'rightBtn:', rightBtn, 'dotsContainer:', dotsContainer);

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        sliderImages.forEach(function (_, idx) {
            let dot = document.createElement('span');
            dot.className = 'slider-dot' + (idx === currentIndex ? ' active' : '');
            dot.addEventListener('click', function () {
                showSlide(idx);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function showSlide(index) {
        if (index < 0) index = sliderImages.length - 1;
        if (index >= sliderImages.length) index = 0;
        currentIndex = index;
        sliderImg.src = sliderImages[currentIndex];
        sliderImg.style.objectFit = 'cover';
        renderDots();
    }

    leftBtn.addEventListener('click', function () {
        showSlide(currentIndex - 1);
    });
    rightBtn.addEventListener('click', function () {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);
}

var products = [];
var cart = [];

function updateProductCount(count) {
    var countElem = document.getElementById('productCount');
    if (countElem) countElem.textContent = count;
}

function createCartItem(item, idx) {
    return `
        <div class="cart-modal__item">
            <div class="cart-modal__top">
                <img src="${item.img}" alt="">
                <span>
                    ${item.name}
                    <b>${item.price} ₽</b>
                </span>
                <div class="cart-modal__qty">
                    <button class="cart-modal__qty-btn" data-idx="${idx}" data-action="minus">–</button>
                    <span class="cart-modal__qty-value">${item.count}</span>
                    <button class="cart-modal__qty-btn" data-idx="${idx}" data-action="plus">+</button>
                </div>
                <button class="cart-modal__remove" data-idx="${idx}" title="Удалить">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.2">
                            <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function renderCart() {
    let cartItems = document.getElementById('cartItems');
    let cartTotal = document.getElementById('cartTotal');
    let cartTotalCount = document.getElementById('cartTotalCount');
    let cartCount = document.getElementById('cartCount');
    let cartTotalCountHeader = document.getElementById('cartTotalCountHeader');

    let total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
    let totalCount = cart.reduce((sum, item) => sum + item.count, 0);

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cartItems">Корзина пуста</p>';
        } else {
            cartItems.innerHTML = cart.map((item, idx) => createCartItem(item, idx)).join('');
        }
    }
    if (cartTotal) cartTotal.textContent = total + ' ₽';
    if (cartTotalCount) cartTotalCount.textContent = totalCount ? totalCount + ' товара' : '';
    if (cartCount) cartCount.textContent = totalCount ? totalCount : '';
    if (cartTotalCountHeader) cartTotalCountHeader.textContent = totalCount ? totalCount : '';

    if (cartItems) {
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
}

function openCartModal() {
    console.log('openCartModal called');
    let modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeCartModal() {
    let modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function initCartModal() {
    let cartBtn = document.querySelector('.header__menu__cart');
    let closeBtn = document.getElementById('cartModalClose');
    let overlay = document.getElementById('cartModalOverlay');
    let clearBtn = document.getElementById('cartModalClear');

    if (cartBtn) {
        cartBtn.addEventListener('click', function (e) {
            renderCart();
            openCartModal();
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeCartModal();
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            closeCartModal();
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            cart.length = 0;
            renderCart();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            let modal = document.getElementById('cartModal');
            if (modal && modal.style.display === 'flex') {
                closeCartModal();
            }
        }
    });
}

function initCart() {
    let addToCartBtns = document.querySelectorAll('.product-card__add');
    addToCartBtns.forEach(function (btn) {
        btn.replaceWith(btn.cloneNode(true));
    });
    let freshBtns = document.querySelectorAll('.product-card__add');
    freshBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let card = this.closest('.product-card');
            addToCart(card);
        });
    });
}

function addToCart(card) {
    let name = card.querySelector('.product-card__desc').textContent;
    let price = parseInt(card.querySelector('.product-card__price b').textContent);
    let img = card.querySelector('.product-card__img').src;
    let id = name + price;

    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.count++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            img: img,
            count: 1
        });
    }
    renderCart();
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav.header-nav');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    });

    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
}

function initFilters() {
    let filterItems = document.querySelectorAll('.filter-item input[type="radio"]');
    filterItems.forEach(function (item) {
        item.addEventListener('change', function () {
            filterProducts();
        });
    });
}

function initSort() {
    console.log('initSort called');
    let customSelect = document.querySelector('.custom-select.main-nav__sort__catalog__text');
    if (!customSelect) return;
    let selected = customSelect.querySelector('.custom-select__selected');
    let options = customSelect.querySelectorAll('.custom-select__option');
    let sortOverlay = document.getElementById('sortOverlay');
    console.log('selected:', selected, 'options:', options, 'sortOverlay:', sortOverlay);

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

    console.log('Filter modal elements:', {openBtn, modal, overlay, closeBtn});

    if (openBtn) {
        openBtn.addEventListener('click', function () {
            console.log('Filter button clicked');
            modal.classList.add('open');
            console.log('Modal classes after open:', modal.className);
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', function () {
        console.log('Filter close button clicked');
        modal.classList.remove('open');
    });

    if (overlay) overlay.addEventListener('click', function () {
        console.log('Filter overlay clicked');
        modal.classList.remove('open');
    });

    let modalRadios = modal ? modal.querySelectorAll('input[type="radio"]') : [];
    var lastCheckedModal = null;

    modalRadios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (this.checked) {
                lastCheckedModal = this;
                filterProducts();
            }
        });

        radio.addEventListener('click', function (e) {
            if (this === lastCheckedModal && this.checked) {
                setTimeout(() => {
                    this.checked = false;
                    lastCheckedModal = null;
                    filterProducts();
                }, 0);
            }
        });
    });
}

function initSortModal() {
    let openBtn = document.getElementById('sortOpenBtn');
    let modal = document.getElementById('sortModal');
    let overlay = document.getElementById('sortOverlay');
    let closeBtn = document.getElementById('sortModalClose');
    let sortItems = modal ? modal.querySelectorAll('.sort-item') : [];

    console.log('Sort modal elements:', {openBtn, modal, overlay, closeBtn});

    if (openBtn) {
        openBtn.addEventListener('click', function () {
            console.log('Sort button clicked');
            modal.classList.add('open');
            console.log('Sort modal classes after open:', modal.className);
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', function () {
        console.log('Sort close button clicked');
        modal.classList.remove('open');
    });

    if (overlay) overlay.addEventListener('click', function () {
        console.log('Sort overlay clicked');
        modal.classList.remove('open');
    });

    sortItems.forEach(function (item) {
        item.addEventListener('click', function () {
            sortItems.forEach(function (opt) {
                opt.classList.remove('custom-select__option--active');
            });
            item.classList.add('custom-select__option--active');

            let selected = document.querySelector('.custom-select__selected');
            if (selected) {
                selected.textContent = item.textContent;
            }

            modal.classList.remove('open');
            sortProducts();
        });
    });
}

function createProductCard(product) {
    return (
        '<div class="product-card" data-type="' + product.type + '">' +
        '<img alt="Product" class="product-card__img" src="' + product.img + '" style="width:278px;height:278px;object-fit:cover;">' +
        '<div class="product-card__desc">' + product.name + '</div>' +
        '<div class="product-card__footer">' +
        '<span class="product-card__price"><b>' + product.price + ' ₽</b></span>' +
        '<button aria-label="Добавить" class="product-card__add" type="button">' +
        '<svg class="svg-default" fill="none" height="32" viewBox="0 0 80 32" width="80" xmlns="http://www.w3.org/2000/svg">' +
        '<rect fill="#7BB899" height="32" rx="8" width="80"/>' +
        '<path d="M40 10.1666V21.8333" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
        '<path d="M34.167 16H45.8337" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
        '</svg>' +
        '<svg class="svg-mobile" fill="none" height="24" viewBox="0 0 40 24" width="40" xmlns="http://www.w3.org/2000/svg">' +
        '<rect fill="#F2F2F2" height="24" rx="6" width="40"/>' +
        '<path d="M20 7.33331V16.6666" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
        '<path d="M15.333 12H24.6663" stroke="#1F2020" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>' +
        '</svg>' +
        '</button>' +
        '</div>' +
        '</div>'
    );
}

var FILTERS = [
    {label: 'НОВИНКИ', value: 'НОВИНКИ'},
    {label: 'ЕСТЬ В НАЛИЧИИ', value: 'ЕСТЬ В НАЛИЧИИ'},
    {label: 'КОНТРАКТНЫЕ', value: 'КОНТРАКТНЫЕ'},
    {label: 'ЭКСКЛЮЗИВНЫЕ', value: 'ЭКСКЛЮЗИВНЫЕ'},
    {label: 'РАСПРОДАЖА', value: 'РАСПРОДАЖА'}
];

function createFilterItem(filter, checked) {
    return (
        '<label class="filter-item">' +
        '<input name="filter" type="radio" ' + (checked ? 'checked' : '') + '>' +
        '<span class="toggle-switch"><span class="toggle-circle"></span></span>' +
        filter.label +
        '</label>'
    );
}

function renderFilterList() {
    var filterList = document.querySelector('.filter-list');
    if (!filterList) return;
    var currentChecked = filterList.querySelector('input[type="radio"]:checked');
    var checkedValue = currentChecked ? currentChecked.parentNode.textContent.trim() : null;
    filterList.innerHTML = FILTERS.map(function (f) {
        return createFilterItem(f, f.value === checkedValue);
    }).join('');
    var radios = filterList.querySelectorAll('input[type="radio"]');
    var lastChecked = null;

    radios.forEach(function (radio, idx) {
        radio.addEventListener('change', function () {
            if (this.checked) {
                lastChecked = this;
                filterProducts();
            }
        });

        radio.addEventListener('click', function (e) {
            if (this === lastChecked && this.checked) {
                setTimeout(() => {
                    this.checked = false;
                    lastChecked = null;
                    filterProducts();
                }, 0);
            }
        });
    });
}

function renderProductsComponent(list) {
    console.log('renderProductsComponent called');
    var productList = document.querySelector('.product-list');
    console.log('productList:', productList);
    if (!productList) {
        console.warn('Контейнер .product-list не найден!');
        return;
    }
    productList.innerHTML = list.map(createProductCard).join('');
    updateProductCount(list.length);
    initCart();
}

function filterProducts() {
    var list = getFilteredAndSortedProducts();
    renderProductsComponent(list);
}

function sortProducts() {
    var list = getFilteredAndSortedProducts();
    renderProductsComponent(list);
}

function getFilteredAndSortedProducts() {
    let checked = document.querySelector('.filter-list:not(.filter-modal .filter-list) input[type="radio"]:checked');
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
    } else if (sortType.trim() === 'СНАЧАЛА НЕДОРОГИЕ') {
        sorted.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    return sorted;
}

let axios;
try {
    axios = require('axios');
} catch (e) {
    axios = window.axios;
}

let API_URL = 'https://67f4eef9913986b16fa26cac.mockapi.io/products';

function fetchProductsFromAPI() {
    console.log('axios:', axios, 'API_URL:', API_URL);
    return axios.get(API_URL)
        .then(function (response) {
            console.log('API response:', response);
            if (Array.isArray(response.data)) {
                products = response.data.map(function (item) {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        img: item.img || 'image/img.png',
                        type: item.type || 'НОВИНКИ'
                    };
                });
                renderProductsComponent(getFilteredAndSortedProducts());
            } else {
                console.warn('API data is not an array:', response.data);
            }
        })
        .catch(function (error) {
            console.warn('Ошибка загрузки товаров с API:', error);
            renderProductsComponent(getFilteredAndSortedProducts());
        });
}

document.addEventListener('DOMContentLoaded', function () {
    renderFilterList();
    if (typeof axios !== 'undefined') {
        fetchProductsFromAPI();
    } else {
        renderProductsComponent(getFilteredAndSortedProducts());
    }
    initSlider();
    initCart();
    initCartModal();
    initFilters && initFilters();
    initSort && initSort();
    initFilterModal && initFilterModal();
    initSortModal && initSortModal();
});

 