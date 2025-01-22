let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = [];
const itemPrices = { 1: 1000, 2: 2000, 3: 3000, 4: 4000, 5: 5000, 6: 6000 };

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");

function handleButtonClick(itemNumber) {
    if (selectedItems.includes(itemNumber)) {
        // Убираем товар из списка, если он уже был выбран
        selectedItems = selectedItems.filter(i => i !== itemNumber);
    } else {
        // Добавляем товар в список
        selectedItems.push(itemNumber);
    }
    updateMainButton();
}

function calculateTotal() {
    return selectedItems.reduce((total, item) => total + itemPrices[item], 0);
}

function updateMainButton() {
    if (selectedItems.length > 0) {
        const total = calculateTotal();
        tg.MainButton.setText(`Выбрано: ${selectedItems.join(", ")} | Сумма: ${total} KZT`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// Привязываем обработчики к кнопкам товаров
btn1.addEventListener("click", function () {
    handleButtonClick(1);
});
btn2.addEventListener("click", function () {
    handleButtonClick(2);
});
btn3.addEventListener("click", function () {
    handleButtonClick(3);
});
btn4.addEventListener("click", function () {
    handleButtonClick(4);
});
btn5.addEventListener("click", function () {
    handleButtonClick(5);
});
btn6.addEventListener("click", function () {
    handleButtonClick(6);
});

// Обработка события MainButton
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    const total = calculateTotal();
    tg.sendData(JSON.stringify({ items: selectedItems, total }));
});

// Отображение информации о пользователе
let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);

// Случайный заказ
let randomOrderBtn = document.getElementById("randomOrder");
randomOrderBtn.addEventListener("click", function () {
    let randomItems = [];
    let allItems = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * allItems.length);
        randomItems.push(allItems[randomIndex]);
        allItems.splice(randomIndex, 1);
    }
    selectedItems = randomItems;
    updateMainButton();
});
