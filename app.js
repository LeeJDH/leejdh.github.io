let tg = window.Telegram.WebApp;

// Расширяем WebApp
tg.expand();

// Настройка главной кнопки Telegram
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = []; // Список выбранных товаров
let totalAmount = 0; // Итоговая сумма

// Массив с товарами
const items = [
    { id: 1, name: "Товар 1", price: 100000 },
    { id: 2, name: "Товар 2", price: 150000 },
    { id: 3, name: "Товар 3", price: 200000 },
    { id: 4, name: "Товар 4", price: 250000 },
    { id: 5, name: "Товар 5", price: 300000 },
    { id: 6, name: "Товар 6", price: 350000 }
];

// Обновление итоговой суммы
function updateTotalAmount() {
    totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

    if (selectedItems.length > 0) {
        tg.MainButton.setText(`Итого: ${totalAmount} KZT`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

// Обработка кликов по товарам
function handleItemClick(itemId) {
    const item = items.find(i => i.id === itemId);

    if (!item) return;

    // Проверяем, выбран ли товар
    const index = selectedItems.findIndex(i => i.id === itemId);

    const button = document.getElementById(`btn${itemId}`);
    if (index !== -1) {
        selectedItems.splice(index, 1); // Убираем товар
        button.classList.remove("selected"); // Снимаем выделение
    } else {
        selectedItems.push(item); // Добавляем товар
        button.classList.add("selected"); // Добавляем выделение
    }

    updateTotalAmount(); // Обновляем итог
}

// Случайный заказ
function handleRandomOrder() {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];

    if (!selectedItems.some(i => i.id === randomItem.id)) {
        selectedItems.push(randomItem);
        document.getElementById(`btn${randomItem.id}`).classList.add("selected");
        updateTotalAmount();
        alert(`Случайный заказ добавлен: ${randomItem.name}`);
    } else {
        alert(`Случайный заказ: ${randomItem.name} уже выбран`);
    }
}

// Привязка событий к кнопкам товаров
items.forEach(item => {
    const button = document.getElementById(`btn${item.id}`);
    if (button) {
        button.addEventListener("click", () => handleItemClick(item.id));
    }
});

// Привязка кнопки случайного заказа
document.getElementById("btnRandom").addEventListener("click", handleRandomOrder);

// Отправка данных в Telegram бота
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    tg.sendData(JSON.stringify(selectedItems)); // Отправка данных о выбранных товарах
});

// Отображение информации о пользователе
const userCard = document.getElementById("usercard");
if (userCard) {
    const userInfo = document.createElement("p");
    userInfo.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
    userCard.appendChild(userInfo);
}
