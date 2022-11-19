let previous = document.getElementById("preview").querySelector("#prev");
let next = document.getElementById("preview").querySelector("#next");
let fullscreenPrevious = document.getElementById("fullscreen").querySelector("#prev");
let fullscreenNext = document.getElementById("fullscreen").querySelector("#next");
let slideNum = 1;
let images = ["image-product-1.jpg", "image-product-2.jpg", "image-product-3.jpg", "image-product-4.jpg"];
let itemsToAdd = 0;
let itemsInCart = 0;
let removeItemButton = document.getElementById("remove-item");
let addItemButton = document.getElementById("add-item");
let submitItemsButton = document.getElementById("submit-items");
let cartMenuButton = document.getElementById("cart");
let removeFromCartButton = document.getElementById("remove-from-cart");
let checkoutButton = document.getElementById("checkout");
let menuExitButton = document.getElementById("menu-exit");
let menuButton = document.getElementById("menu-button");
let previewSlideNum = 1;

fullscreenPrevious.addEventListener("click", () => previousSlide());
fullscreenNext.addEventListener("click", () => nextSlide());  
previous.addEventListener("click", () => previousSlide());
next.addEventListener("click", () => nextSlide());
removeItemButton.addEventListener("click", () => removeItem());
addItemButton.addEventListener("click", () => addItem());
submitItemsButton.addEventListener("click", () => submitItems());
cartMenuButton.addEventListener("click", () => cartMenu());
removeFromCartButton.addEventListener("click", () => removeFromCart());
checkoutButton.addEventListener("click", ()=> checkout());
menuExitButton.addEventListener("click", ()=> exitMenu());
menuButton.addEventListener("click", ()=>openMenu());

previous.classList.add("disappear");
next.classList.add("disappear");
document.getElementById("items-count").classList.add("disappear");
document.getElementById("overlay").classList.add("disappear");
document.getElementById("cart-menu").classList.add("disappear");
document.getElementById("fullscreen").classList.add("disappear");
document.getElementById("cart-item").classList.add("disappear");
// document.getElementById("link-list").classList.add("disappear");

function setMainSlide(n, element) {
    let mainSlide;

    //Using images button
    if (typeof element !== "undefined") {
        let parentId = element.parentElement.parentElement.parentElement.id;

        if (parentId === "preview") {
            mainSlide = document.getElementById("preview").querySelector("#image");
            let preview = document.getElementById("preview");
            preview.getElementsByClassName("active")[0].classList.remove("active");
            preview.getElementsByTagName("li")[n - 1].classList.add("active");
        } else if (parentId === "fullscreen") {
            mainSlide = document.getElementById("fullscreen").querySelector("#image");
            let fullscreen = document.getElementById("fullscreen");
            fullscreen.getElementsByClassName("active")[0].classList.remove("active");
            fullscreen.getElementsByTagName("li")[n - 1].classList.add("active");
        }
    //Using next, prev buttons
    } else {
        if (!document.getElementById("fullscreen").classList.contains("disappear")) {
            mainSlide = document.getElementById("fullscreen").querySelector("#image");
            let fullscreen = document.getElementById("fullscreen");
            fullscreen.getElementsByClassName("active")[0].classList.remove("active");
            fullscreen.getElementsByTagName("li")[n - 1].classList.add("active");
        } else {
            mainSlide = document.getElementById("preview").querySelector("#image");
            let preview = document.getElementById("preview");
            preview.getElementsByClassName("active")[0].classList.remove("active");
            preview.getElementsByTagName("li")[n - 1].classList.add("active");
        }
    }

    mainSlide.setAttribute("src", "images/" + images[n - 1]);
    slideNum = n;
}

function openPreview() {
    if (window.innerWidth > 900) {
        previewSlideNum = slideNum;
        document.getElementsByClassName("overlay")[0].classList.remove("disappear");
        let preview = document.getElementById("fullscreen");
        document.getElementById("fullscreen").classList.remove("disappear");
        let slideButtons = Array.from(preview.getElementsByClassName("slide-button"));
        
        slideButtons.forEach(slideButton => {
            slideButton.classList.remove("disappear");
        });

        setMainSlide(slideNum);
    }
}

function closeFullscreen() {
    slideNum = previewSlideNum;
    setMainSlide(slideNum);
    document.getElementsByClassName("overlay")[0].classList.add("disappear");
    document.getElementById("fullscreen").classList.add("disappear");
}

function previousSlide() {
    if (slideNum > 1) {
        slideNum--;
    } else {
        slideNum = 4;
    }

    setMainSlide(slideNum);
}

function nextSlide() {
    if (slideNum < 4) {
        slideNum++;
    } else {
        slideNum = 1;
    }

    setMainSlide(slideNum);
}

function addItem() {
    itemsToAdd++;
    document.getElementById("items-to-add").innerHTML = itemsToAdd;
}

function removeItem() {
    if (itemsToAdd > 0) {
        itemsToAdd--;
        document.getElementById("items-to-add").innerHTML = itemsToAdd;
    }
}

function submitItems() {
    if (itemsToAdd == 0) {
        alert("First add items to your cart");
    } else {
        itemsInCart += itemsToAdd;
        itemsToAdd = 0;
        document.getElementById("items-count").innerHTML = itemsInCart;
        document.getElementById("items-count").classList.remove("disappear");
        document.getElementById("items-to-add").innerHTML = itemsToAdd;
        document.getElementById("cart-empty").classList.add("disappear");
        document.getElementById("cart-item").classList.remove("disappear");
        document.getElementById("item-price").innerHTML = "$125.00 x " + itemsInCart;
        document.getElementById("total-price").innerHTML = "$" + 125 * itemsInCart + ".00";
    }
}

function cartMenu() {
    if (!document.getElementById("cart-menu").classList.contains("disappear")) {
        document.getElementById("cart-menu").classList.add("disappear");
    } else {
        document.getElementById("cart-menu").classList.remove("disappear");
    }
}

function removeFromCart() {
    itemsInCart = 0;
    document.getElementById("cart-item").classList.add("disappear");
    document.getElementById("cart-empty").classList.remove("disappear");
    document.getElementById("items-count").classList.add("disappear");
}

function checkout() {
    removeFromCart();
}

function exitMenu() {
    document.getElementById("link-list").style.display = "none";
}

function openMenu() {
    document.getElementById("link-list").style.display = "flex";
}