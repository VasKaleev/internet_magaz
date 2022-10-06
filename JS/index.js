//To close|open Menu 
function closeFn() {
    var x = document.getElementById("menuBar");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  //Open register Box
  function openRegisterBox(){
    let registerBox = document.getElementsByClassName("register-box")[0];
    registerBox.style.display = "block";
  }

    //Close register Box
  function closeRegisterBox(){
    let registerBox = document.getElementsByClassName("register-box")[0];
    registerBox.style.display = "none";
  } 
  //Close Login box
  function closeLoginBox(){
    let loginBox = document.getElementsByClassName("login-box")[0];
    loginBox.style.display = "none";
  }
  //Open Login box
  function openLoginBox(){
    let loginBox = document.getElementsByClassName("login-box")[0];
    loginBox.style.display = "block";
  }
//Open Login box from Register box
  function openLoginBoxFromRegisBox(){
    openLoginBox();
    closeRegisterBox();
  }
//Open Registor box from Login box
  function openRegisBoxFromLoginBox(){
    closeLoginBox();
    openRegisterBox()
  }
  //open Shopping Cart page
  function shoppingCart(){
    window.location.href = "shopping-cart.html";
  }

  let product = [
    {
      name: "ArchosA9PCtablet",
      tag: "Archos",
      price: 250,
      inCart: 0
    },
    {
      name: "Laptop HP Compaq Mini 5103",
      tag: "HP",
      price: 500,
      inCart: 0
    },
    {
      name: "Monoblock MSI Wind Top AP1920 Black",
      tag: "MSI Wind",
      price: 350,
      inCart: 0
    },
    {
      name: "Laptop Samsung 300U1A-A01",
      tag: "Samsung",
      price: 400,
      inCart: 0
    },
    {
      name: "Apple iMac with Retina 5K Display",
      tag: "Apple",
      price: 2500,
      inCart: 0
    },
    {
      name: "New Apple iMac Pro",
      tag: "Apple",
      price: 499,
      inCart: 0
    },
    {
      name: "Microsoft Surface Studio 2",
      tag: "Microsoft",
      price: 3500,
      inCart: 0
    },
    {
      name: "Samsung 300V5A-S0L Orange",
      tag: "Samsung",
      price: 400,
      inCart: 0
    },
    {
      name: "Samsung Galaxy Tab-P7500 16Gb",
      tag: "Samsung",
      price: 430,
      inCart: 0
    },
    {
      name: "Sony Vaio J11M1RB Black",
      tag: "Sony",
      price: 700,
      inCart: 0
    },
    {
      name: "Lenovo IdeaPad U165 K1252G250S-B",
      tag: "Lenovo",
      price: 250,
      inCart: 0
    },
    {
      name: "HTC A6380 Gratia Green",
      tag: "HTC",
      price: 500,
      inCart: 0
    },
    {
      name: "Apple iPhone 4 32Gb White",
      tag: "Apple",
      price: 510,
      inCart: 0
    },
    {
      name: "Acer Liquid E Ferrari S100",
      tag: "Acer",
      price: 120,
      inCart: 0
    },
    {
      name: "Samsung S5233t Red",
      tag: "Samsung",
      price: 100,
      inCart: 0
    }
  ];
  
// var carts = document.querySelectorAll('#add-to-basket');

// for( i = 0; i < carts.length; i++){
//   carts[i].addEventListener('click', () => cartNumbers(product[n])
//   )}
//Product quantity counter
  function onLoadCartNumbers(){
    let productNumber = localStorage.getItem('cartNumbers');
    if(productNumber){
      document.querySelector('#shopping-cart-counter').textContent = productNumber;
    }
  }
  function cartNumbers(product) {
    let productNumber = localStorage.getItem('cartNumbers');
    productNumber = parseInt(productNumber);
    if (productNumber){
      localStorage.setItem('cartNumbers', productNumber + 1);
      document.querySelector('#shopping-cart-counter').textContent = productNumber + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#shopping-cart-counter').textContent = 1;
      }

      setItems(product);
      totalCost(product);
    }

function setItems(product){
  let cartItems = localStorage.getItem('productInCarts');
  cartItems = JSON.parse(cartItems);
  if ( cartItems != null ) {
    if ( cartItems[product.tag] == undefined ){
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
      cartItems[product.tag].inCart += 1; 
    }else{
      product.inCart = 1;
      cartItems = {
        [product.tag] : product
    }
  } 
  localStorage.setItem('productInCarts', JSON.stringify(cartItems));
}

function totalCost(product){
let cardCost = localStorage.getItem('totalCost');
if (cardCost != null){
    cardCost = parseInt(cardCost);
    localStorage.setItem('totalCost', cardCost + product.price)
} else {
    localStorage.setItem('totalCost', product.price)
}
}

function displayCart(){
  let cartItems = localStorage.getItem('productInCarts');
  cartItems = JSON.parse(cartItems); 
  let shoppingCartContainer = document.querySelector('.productList');
  let cardCost = localStorage.getItem('totalCost');
  if (cartItems &&  shoppingCartContainer){
    shoppingCartContainer.innerHTML = '';
    Object.values(cartItems).map(item=> {
      shoppingCartContainer.innerHTML += `
        <div class ="productItem">
            <div class="productInfo">
            <ion-icon name="close-circle-outline" onclick="deleteProduct(this)"></ion-icon>
                <img src="./src/products/${item.name}.jpg" alt="${item.name}">
                <p class="productName">${item.name}</p>
            </div>
            <p class="productPrice">$${item.price},00</p>
            <p>${item.inCart}</p>
            <p class="productTotal">$${item.price * item.inCart},00</p>
        </div>
`;
    });
    shoppingCartContainer.innerHTML += `
    <div class="shoppingCartTotal">
     <p>Total price: <strong>$${cardCost},00</strong></p> 
    </div>
    `
  }
  else{
    shoppingCartContainer.innerHTML = `<p id="shoppingCartNotification"> Shopping cart empty! </p>`;
    //Hide block when shopping cart empty
    document.querySelector('.orderBtns').style.display = 'none';
  }
}
onLoadCartNumbers();
displayCart();

//Clear localStorage
function clearAll(){
  localStorage.clear();
  location.reload();
}

//Remove product
function deleteProduct(){
alert('hi');
}


//Increase quantity of product
function increaseQuantity(){ 
  let quantity = document.querySelector('.productQuantity').value;
  quantity++;
  document.querySelector('.productQuantity').value++;
  let price = document.querySelector('#price').textContent;
  price = parseInt(price);
  ( quantity >= 2)? document.querySelector('#price').textContent = `${(quantity * price) / (quantity - 1)}`: document.querySelector('#price').textContent = `${quantity * price}`;
}
//Decrease quantity of product
function decraeseQuantity(){
  let quantity = document.querySelector('.productQuantity').value;
  (quantity == 1)? document.querySelectorAll('#superplus')[2].disabled = true: quantity--;
  document.querySelector('.productQuantity').value--;
  let price = document.querySelector('#price').textContent;
  price = parseInt(price);
  ( quantity >= 2)? document.querySelector('#price').textContent = `${(quantity * price) / (quantity + 1)}`: document.querySelector('#price').textContent = `${(quantity * price)/2}`;
}
//Create one click order box
function oneclickOrder(product){
  let oneClickOrderBox = document.querySelector('#oneClickorderProductView');
  oneClickOrderBox.innerHTML = `
  <div class="sellingProduct" style="width: 100%; text-align: center; padding: 0 20px; text-align:center"> 
  <img src="./src/products/${product.name}.jpg" alt="${product.name}" style="max-width: 300px;
  max-height: 150px; position: relative;">
  <p>${product.name}</p>
  <p style="color:red; font-size: 18px; line-height: 0;">$${product.price},00</p>
  </div>
  `;
}
let openRequest = indexedDB.open("store", 1);