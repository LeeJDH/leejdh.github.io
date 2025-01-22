let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = []; // Список выбранных товаров
let totalAmount = 0; // Итоговая сумма

// Массив с ценами товаров
const items = [
    { id: 1, name: "Товар 1", price: 100000 },
    { id: 2, name: "Товар 2", price: 150000 },
    { id: 3, name: "Товар 3", price: 200000 },
    { id: 4, name: "Товар 4", price: 250000 },
    { id: 5, name: "Товар 5", price: 300000 },
    { id: 6, name: "Товар 6", price: 350000 }
];

// Функция для обновления суммы
function updateTotalAmount() {
    totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);
    if (selectedItems.length > 0) {
        tg.MainButton.setText(`Итого: ${totalAmount} KZT`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// Функция для обработки клика по кнопкам товаров
function handleItemClick(itemId) {
    const item = items.find(i => i.id === itemId);

    if (!item) return;

    // Если товар уже выбран, убираем его, иначе добавляем
    const index = selectedItems.findIndex(i => i.id === itemId);
    if (index !== -1) {
        selectedItems.splice(index, 1); // Удалить товар
    } else {
        selectedItems.push(item); // Добавить товар
    }

    updateTotalAmount(); // Обновить сумму
}

// Функция для случайного заказа
function handleRandomOrder() {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];

    if (!selectedItems.some(i => i.id === randomItem.id)) {
        selectedItems.push(randomItem);
        updateTotalAmount();
        alert(`Случайный заказ: ${randomItem.name}`);
    } else {
        alert(`Случайный заказ: ${randomItem.name} уже выбран`);
    }
}

// Привязка кнопок к обработчику кликов
document.getElementById("btn1").addEventListener("click", () => handleItemClick(1));
document.getElementById("btn2").addEventListener("click", () => handleItemClick(2));
document.getElementById("btn3").addEventListener("click", () => handleItemClick(3));
document.getElementById("btn4").addEventListener("click", () => handleItemClick(4));
document.getElementById("btn5").addEventListener("click", () => handleItemClick(5));
document.getElementById("btn6").addEventListener("click", () => handleItemClick(6));

// Привязка кнопки случайного заказа
document.getElementById("btnRandom").addEventListener("click", handleRandomOrder);

// Отправка данных в бот
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    tg.sendData(JSON.stringify(selectedItems)); // Отправка выбранных товаров
});

// Отображение информации о пользователе
let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);
