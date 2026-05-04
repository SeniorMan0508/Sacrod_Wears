const cartButtons = document.querySelectorAll(".item button");
const cartItems = document.getElementById("cartItems");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.getElementById("cartTotal");
const cartIcon = document.getElementById("cartIcon");
const cartBox = document.getElementById("cartBox");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

/* OPEN CART */
cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    cartBox.classList.toggle("hidden");
});

/* ADD TO CART */
cartButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const item = btn.closest(".item");

        const id = item.dataset.id || "NO-ID";
        const name = item.querySelector("p").textContent;
        const price = parseInt(item.querySelector(".price").textContent.replace(/[^0-9]/g, ""));
        const image = item.querySelector("img").src;

        cart.push({
            id,
            name,
            price,
            image
        });

        updateCart();
    });
});

/* UPDATE CART */
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <p>${item.id} - ${item.name}</p>
                    <small>₦${item.price.toLocaleString()}</small>
                </div>
                <button onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toLocaleString();
}

/* REMOVE ITEM */
window.removeItem = function(index){
    cart.splice(index, 1);
    updateCart();
};

/* CHECKOUT TO WHATSAPP */
checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    let message = "🛒 NEW ORDER%0A%0A";

    let total = 0;

    cart.forEach(item => {

        total += item.price;

        message +=
`ID: ${item.id}
Name: ${item.name}
Price: ₦${item.price}
Image: ${item.image}

%0A`;
    });

    message += `TOTAL: ₦${total}`;

    const phone = "2349060657659";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});