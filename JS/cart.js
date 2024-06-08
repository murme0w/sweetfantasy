// Ждем полной загрузки страницы, затем вызываем renderCart для отображения корзины
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

// Функция добавления товара в корзину
function addToCart(name, price, button) {
  // Создаем и стилизуем всплывающее окно
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = 'rgba(51, 51, 51, 0.7)';
  popup.style.color = '#fff';
  popup.style.padding = '20px';
  popup.style.borderRadius = '30px';
  popup.style.zIndex = '9999';
  popup.style.opacity = '0';
  popup.style.transition = 'opacity 0.5s, transform 0.5s';

  // Функция отображения всплывающего окна с сообщением
  function showPopup(message, duration = 3000) {
      popup.innerHTML = message;
      document.body.appendChild(popup);

      setTimeout(() => {
          popup.style.opacity = '1';
          popup.style.transform = 'translate(-50%, -50%) scale(1.1)';
      }, 10);

      setTimeout(() => {
          popup.style.opacity = '0';
          popup.style.transform = 'translate(-50%, -50%) scale(1)';
          setTimeout(() => {
          document.body.removeChild(popup);
          }, 500);
      }, duration);
  }

  // Показываем всплывающее окно с сообщением "Товар добавлен!"
  showPopup('Товар добавлен!');

  // Получаем корзину из локального хранилища или создаем новую, если её нет
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Проверяем, есть ли товар уже в корзине
  const product = cart.find(item => item.name === name);
  if (product) {
      // Если товар есть, увеличиваем количество
      product.quantity += 1;
  } else {
      // Если товара нет, добавляем его в корзину
      cart.push({ name, price, quantity: 1 });
  }
  // Сохраняем обновленную корзину в локальное хранилище
  localStorage.setItem('cart', JSON.stringify(cart));
  // Обновляем отображение корзины
  renderCart();
  // Обновляем счетчик на кнопке (если требуется)
  updateButtonCount(name, button);
}

// Функция для отображения корзины
function renderCart() {
  // Получаем корзину из локального хранилища или создаем новую, если её нет
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  // Проходимся по каждому товару в корзине
  cart.forEach(item => {
  const itemTotal = item.price * item.quantity;
  total += itemTotal;
  // Добавляем товар в HTML корзины
  cartItems.innerHTML += `
      <div class="cart-item">
      <div class="item-info">
          <span class="item-name">${item.name}</span>
      </div>
      <div class="item-total">
          <span> ${itemTotal} р</span>
      </div>
      <div class="item-buttons">
          <button class="minus" onclick="decrementQuantity('${item.name}')">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="plus" onclick="incrementQuantity('${item.name}')">+</button>
          <button class="delete" onclick="removeFromCart('${item.name}')">Удалить</button>
      </div>
      </div>`;
  });

  // Обновляем общую сумму корзины
  cartTotal.innerHTML = `Общая сумма: ${total} р`;
  // Инициализируем счетчики кнопок (если требуется)
  initializeButtonCounts();
}

// Функция для увеличения количества товара в корзине
function incrementQuantity(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.name === name);
  if (product) {
      product.quantity += 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Функция для уменьшения количества товара в корзине
function decrementQuantity(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.name === name);
  if (product && product.quantity > 0) {
      product.quantity -= 1;
      // Удаляем товар из корзины, если его количество стало 0
      if (product.quantity === 0) {
          cart = cart.filter(item => item.name !== name);
      }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Функция для удаления товара из корзины
function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Функция для очистки всей корзины
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

// Получаем элементы кнопки и модального окна
var checkoutBtn = document.getElementById("checkout-btn");
var modal = document.getElementById("checkout-modal");
var modalMessage = document.getElementById("modal-message");

// Получаем элемент закрытия модального окна
var span = document.getElementsByClassName("close2")[0];

// Когда пользователь нажимает на кнопку, открываем модальное окно
checkoutBtn.onclick = function() {
  modal.style.display = "block";
  clearCart(); // Очищаем корзину при нажатии на кнопку оформления заказа
}

// Когда пользователь нажимает вне модального окна, закрываем его
window.onclick = function(event) {
  if (event.target == modal) {
  modal.style.display = "none";
  }
}