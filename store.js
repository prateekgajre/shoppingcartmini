if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var quantityInputs = document.getElementsByClassName('input-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', onChangeQuantity)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', onClickPurchase)
}

function onClickPurchase() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    let productList = document.getElementsByClassName("product");
    for (var i = 0; i < productList.length; i++) {
            let buttonprop = productList[i].getElementsByClassName("btn-primary")
            buttonprop[0].disabled = false;
    }
    updateCartTotal()
}
function myFunctionDelete(event) {
    var buttonClicked = event
    let itemTitle = event.parentElement.parentElement.getElementsByClassName("cart-item-title");
    let productDiv = event.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    let productList = productDiv.getElementsByClassName("product");
    for (var i = 0; i < productList.length; i++) {
        let productTitle = productList[i].getElementsByClassName("product-title")
        if (productTitle[0].innerText == itemTitle[0].innerText) {
            let buttonprop = productList[i].getElementsByClassName("btn-primary")
            buttonprop[0].disabled = false;
        }
    }
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function onChangeQuantity(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function myFunction(event) {
    let item = event.parentElement.parentElement
    event.disabled = true;
    let title = item.getElementsByClassName('product-title')[0].innerText
    let price = item.getElementsByClassName('product-price')[0].innerText
    let image = item.getElementsByClassName('product-image')[0].src
    addItemToCart(image, title, price)
    updateCartTotal()
}
function addItemToCart(image, title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let itemsList = document.getElementsByClassName('cart-items')[0]
    cartRow.innerHTML = `
    <div class="cart-column">
        <span class="cart-item-title">${title}</span>
    </div
    <div class="cart-column-img">
        <div><img class="cart-item-image" src="${image}" width="100" height="100"></div>
        <div class="cart-price">${price}</div>
    </div>
    
    <div class="cart-quantity cart-column">
        <input class="input-quantity" type="number" value="1">
        <button class="btn btn-remove" onclick="myFunctionDelete(this)" type="button">REMOVE</button>
    </div>`
    itemsList.append(cartRow)
    cartRow.getElementsByClassName('input-quantity')[0].addEventListener('change', onChangeQuantity)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (var i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('input-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
