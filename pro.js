let cartCount = 0;
let cartTotal = 0;

function addToCart(name, price) {
    cartCount++;
    cartTotal += price;

    document.getElementById("cartCount").textContent = cartCount;

    alert(
        name + " added to cart!\n" +
        "Cart items: " + cartCount + "\n" +
        "Total: ₦" + cartTotal.toLocaleString("en-NG")
    );
}

function filterProducts(category) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        if (
            category === "All" ||
            card.dataset.category === category
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
function renderUploadedProducts() {
    const container = document.getElementById("products");
    let products = [];
    try { products = JSON.parse(localStorage.getItem("abyoProducts")) || []; }
    catch (e) {}

    products.forEach(function(p) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.category = p.category;

        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.name;

        const title = document.createElement("h3");
        title.textContent = p.name;

        const price = document.createElement("p");
        price.textContent = "₦" + p.price.toLocaleString("en-NG");

        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", function() {
            addToCart(p.name, p.price);
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(btn);
        container.appendChild(card);
    });
}

renderUploadedProducts();

// ----- Search suggestions -----
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

// Build the product list from the cards already on the page
const productList = Array.from(document.querySelectorAll(".card")).map(function(card) {
    return {
        name: card.querySelector("h3").textContent.trim(),
        price: card.querySelector("p").textContent.trim()
    };
});

function showSuggestions() {
    const text = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (text === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    // Unique product names that match, max 6
    const seen = new Set();
    const matches = productList.filter(function(product) {
        const key = product.name.toLowerCase();
        if (!key.includes(text) || seen.has(key)) return false;
        seen.add(key);
        return true;
    }).slice(0, 6);

    if (matches.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    matches.forEach(function(product) {
        const item = document.createElement("div");
        item.className = "suggestion-item";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = product.name;

        const priceSpan = document.createElement("span");
        priceSpan.textContent = product.price;

        item.appendChild(nameSpan);
        item.appendChild(priceSpan);

        item.addEventListener("click", function() {
            searchInput.value = product.name;
            searchProducts();
        });

        suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = "block";
}

searchInput.addEventListener("input", showSuggestions);

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") searchProducts();
});

// Close suggestions when clicking elsewhere
document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-box")) {
        suggestionsBox.style.display = "none";
    }
});

// Replace your old searchProducts with this one
function searchProducts() {
    const text = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".card").forEach(function(card) {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(text) ? "block" : "none";
    });

    suggestionsBox.style.display = "none";
}
renderUploadedProducts()