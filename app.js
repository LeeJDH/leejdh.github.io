let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let cart = []; // Корзина для выбранных товаров
let totalAmount = 0; // Общая сумма
const items = [
    { id: 1, name: "Товар 1", price: 100000},
    { id: 2, name: "Товар 2", price: 150000 },
    { id: 3, name: "Товар 3", price: 200000 },
    { id: 4, name: "Товар 4", price: 250000 },
    { id: 5, name: "Товар 5", price: 300000 },
    { id: 6, name: "Товар 6", price: 350000 },
];

// Обновление кнопки Telegram
function updateMainButton() {
    if (cart.length > 0) {
        const itemCount = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        tg.MainButton.setText(`Вы выбрали ${itemCount} товаров на сумму ${total} KZT`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// Добавление товара в корзину
function addToCart(itemId) {
    const item = items.find((i) => i.id === itemId);
    if (item) {
        cart.push(item);
        totalAmount += item.price;
        updateMainButton();
        alert(`${item.name} добавлен в корзину!`);
    }
}

// Обработка случайного выбора товара
function randomOrder() {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    addToCart(randomItem.id);
}

// Привязка кнопок товаров
document.getElementById("btn1").addEventListener("click", () => addToCart(1));
document.getElementById("btn2").addEventListener("click", () => addToCart(2));
document.getElementById("btn3").addEventListener("click", () => addToCart(3));
document.getElementById("btn4").addEventListener("click", () => addToCart(4));
document.getElementById("btn5").addEventListener("click", () => addToCart(5));
document.getElementById("btn6").addEventListener("click", () => addToCart(6));

// Кнопка случайного заказа
document.getElementById("randomOrder").addEventListener("click", randomOrder);

// Отправка данных Telegram боту
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    tg.sendData(JSON.stringify(cart)); // Отправляем корзину как строку
    tg.close(); // Закрываем WebApp
});

// Отображение имени пользователя
let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);

tg.ready();
