// NCC Store Products
const products = [
  {id:'hackle', name:'Hackle', price:100, img:'images/hackle.jpg'}, // Image: Hackle
  {id:'pom_pom', name:'Pom Pom', price:50, img:'images/pom_pom.jpg'}, // Image: Pom Pom
  {id:'cap_badge', name:'Cap Badge', price:150, img:'images/cap_badge.jpg'}, // Image: Cap Badge
  {id:'barret_green', name:'Barret (Green)', price:200, img:'images/barret_green.jpg'}, // Image: Barret (Green)
  {id:'lineyard', name:'LineYard', price:120, img:'images/lineyard.jpg'}, // Image: LineYard
  {id:'title_shoulder', name:'Title Shoulder', price:80, img:'images/title_shoulder.jpg'}, // Image: Title Shoulder
  {id:'name_plate', name:'Name Plate', price:60, img:'images/name_plate.jpg'}, // Image: Name Plate
  {id:'enrollment_badge', name:'Enrollment Badge', price:100, img:'images/enrollment_badge.jpg'}, // Image: Enrollment Badge
  {id:'ncc_ranks', name:'NCC Ranks', price:130, img:'images/ncc_ranks.jpg'}, // Image: NCC Ranks
  {id:'leather_belt', name:'Leather Belt (with Buckle)', price:250, img:'images/leather_belt.jpg'}, // Image: Leather Belt
  {id:'socks', name:'Socks (Black/White)', price:40, img:'images/socks.jpg'}, // Image: Socks
  {id:'uniform_army', name:'Uniform - Army', price:500, img:'images/uniform_army.jpg'}, // Image: Uniform Army
  {id:'uniform_navy', name:'Uniform - Navy', price:500, img:'images/uniform_navy.jpg'}, // Image: Uniform Navy
  {id:'uniform_air', name:'Uniform - Air', price:500, img:'images/uniform_air.jpg'}, // Image: Uniform Air
  {id:'dms_shoes', name:'DMS Shoes', price:400, img:'images/dms_shoes.jpg'}, // Image: DMS Shoes
  {id:'shoes_op', name:'Shoes OP (Cut Shoe)', price:300, img:'images/shoes_op.jpg'}, // Image: Shoes OP
  {id:'sport_shoe', name:'Sport Shoe', price:350, img:'images/sport_shoe.jpg'}, // Image: Sport Shoe
  {id:'track_suit', name:'NCC Track Suit', price:600, img:'images/track_suit.jpg'}, // Image: Track Suit
  {id:'tshirt_white', name:'NCC T-shirt (White)', price:200, img:'images/tshirt_white.jpg'}, // Image: T-shirt White
  {id:'tshirt_blue', name:'NCC T-shirt (Blue)', price:200, img:'images/tshirt_blue.jpg'}, // Image: T-shirt Blue
  {id:'kamar_bandh', name:'Kamar Bandh Jhallar', price:150, img:'images/kamar_bandh.jpg'}, // Image: Kamar Bandh Jhallar
  {id:'scarf_set', name:'Scarf Set', price:180, img:'images/scarf_set.jpg'}, // Image: Scarf Set
  {id:'spades', name:'Spades', price:100, img:'images/spades.jpg'}, // Image: Spades
  {id:'gloves', name:'Gloves', price:90, img:'images/gloves.jpg'}, // Image: Gloves
  {id:'jersey_army', name:'Jersey (Army)', price:300, img:'images/jersey_army.jpg'}, // Image: Jersey Army
  {id:'jersey_navy', name:'Jersey (Navy)', price:300, img:'images/jersey_navy.jpg'}, // Image: Jersey Navy
  {id:'jersey_air', name:'Jersey (Air)', price:300, img:'images/jersey_air.jpg'}  // Image: Jersey Air
];

let cart = [];

// Display products
const productList = document.getElementById("product-list");
products.forEach(p => {
  let div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Add to cart
function addToCart(id) {
  let product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

// Render cart
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    let div = document.createElement("div");
    div.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = total;
}

// Checkout
function checkout() {
  if(cart.length === 0) return alert("Your cart is empty!");
  document.getElementById("paymentModal").style.display = "flex";
}

// Close modal
function closeModal() {
  document.getElementById("paymentModal").style.display = "none";
}

// Confirm payment
function confirmPayment() {
  const txnId = document.getElementById("txnId").value;
  if(!txnId) return alert("Enter Transaction ID");
  alert("Payment Successful! Transaction ID: " + txnId);
  generateReceipt(txnId);
  cart = [];
  renderCart();
  closeModal();
}

// Generate receipt (download JSON file)
function generateReceipt(txnId) {
  const receipt = {
    store: "NCC Store",
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0),
    transactionId: txnId,
    date: new Date().toLocaleString()
  };
  const blob = new Blob([JSON.stringify(receipt, null, 2)], {type: "application/json"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "receipt.json";
  link.click();
}
