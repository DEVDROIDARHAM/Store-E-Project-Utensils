// SCROLL ANIMATIONS
function checkAnimations() {
    var elements = document.querySelectorAll('.slide-left, .slide-right');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getBoundingClientRect().top < window.innerHeight - 80) {
            elements[i].classList.add('visible');
        }
    }
}
window.addEventListener('scroll', checkAnimations);
window.addEventListener('load', checkAnimations);

// NAVBAR SCROLL
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// FILTER BY CATEGORY
function filterByCategory(category, btn) {
    var cards = document.querySelectorAll('[data-category]');
    var btns  = document.querySelectorAll('.btn-filter');
    for (var i = 0; i < btns.length; i++)  btns[i].classList.remove('active');
    btn.classList.add('active');
    var count = 0;
    for (var i = 0; i < cards.length; i++) {
        if (category == 'all' || cards[i].getAttribute('data-category') == category) {
            cards[i].style.display = 'block';
            count++;
        } else {
            cards[i].style.display = 'none';
        }
    }
    document.getElementById('productCount').textContent = 'Showing ' + count + ' product' + (count !== 1 ? 's' : '');
}

// SEARCH
function filterProducts() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var cards = document.querySelectorAll('[data-search]');
    var count = 0;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('data-search').includes(input)) {
            cards[i].style.display = 'block';
            count++;
        } else {
            cards[i].style.display = 'none';
        }
    }
    document.getElementById('productCount').textContent = 'Showing ' + count + ' product' + (count !== 1 ? 's' : '');
}

// SHOW PRODUCT DETAILS IN MODAL
function openModal(id) {
    var product;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            product = products[i];
            break;
        }
    }
    if (!product) return;

    document.getElementById('modalName').textContent        = product.name;
    document.getElementById('modalImage').src               = product.image;
    document.getElementById('modalCategory').textContent    = product.category;
    var badge = document.getElementById('modalBadge');
    badge.textContent = product.quality;
    badge.className   = product.quality === 'Premium' ? 'badge-premium' : 'badge-standard';
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent       = 'PKR ' + product.price;
    document.getElementById('modalMaterial').textContent    = product.material;
    document.getElementById('modalWeight').textContent      = product.weight;
    document.getElementById('modalWarranty').textContent    = product.warranty;
    document.getElementById('modalBestFor').textContent     = product.bestFor;
    document.getElementById('modalRating').textContent      = product.rating + ' / 5';
    document.getElementById('modalCartBtn').onclick         = function() { addToCart(id); };

    var modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// ADD TO CART
function addToCart(id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            alert('Added: ' + products[i].name + '\nPrice: PKR ' + products[i].price);
            break;
        }
    }
}

// TODAY OFFER - discounts page
function displayTodayOffer() {
    var el = document.getElementById('todayOffer');
    if (!el) return;
    var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var offers = ['2x Loyalty Points','10% OFF All Products','5% OFF Cookware','15% OFF Selected Items','10% OFF Premium Products','20% OFF Sets & Knives','Free Delivery Above PKR 3,000'];
    var today  = new Date().getDay();
    el.textContent = days[today] + ' Special: ' + offers[today];
}

// FEEDBACK DROPDOWN - feedback page
function populateProductDropdown() {
    var select = document.getElementById('product');
    if (!select || typeof products === 'undefined') return;
    for (var i = 0; i < products.length; i++) {
        var option         = document.createElement('option');
        option.value       = products[i].name;
        option.textContent = products[i].name;
        select.appendChild(option);
    }
}

// FEEDBACK SUBMIT - feedback page
function submitFeedback(event) {
    event.preventDefault();
    var name     = document.getElementById('fullName').value.trim();
    var email    = document.getElementById('email').value.trim();
    var product  = document.getElementById('product').value;
    var feedback = document.getElementById('feedback').value.trim();
    var pRating  = document.querySelector('input[name="productRating"]:checked');
    var sRating  = document.querySelector('input[name="serviceRating"]:checked');

    if (!name)               return showError('Please enter your full name');
    if (!email)              return showError('Please enter your email');
    if (!product)            return showError('Please select a product');
    if (!pRating)            return showError('Please rate product quality');
    if (!sRating)            return showError('Please rate service quality');
    if (feedback.length < 20) return showError('Feedback must be at least 20 characters');

    document.getElementById('errorMessage').style.display   = 'none';
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('feedbackForm').reset();
    setTimeout(function() {
        document.getElementById('successMessage').style.display = 'none';
    }, 4000);
}

function showError(msg) {
    document.getElementById('errorText').textContent      = msg;
    document.getElementById('errorMessage').style.display = 'block';
}

// RUN ON PAGE LOAD
window.onload = function() {
    displayTodayOffer();
    populateProductDropdown();
};