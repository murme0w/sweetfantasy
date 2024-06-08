// Получаем все кнопки с классом 'category-buttons button'
const buttons = document.querySelectorAll('.category-buttons button');
// Получаем все элементы с классом 'product'
const products = document.querySelectorAll('.product');

// Для каждой кнопки добавляем обработчик события 'click'
buttons.forEach(button => {
button.addEventListener('click', () => {
    // Получаем значение атрибута 'data-category' у нажатой кнопки
    const category = button.getAttribute('data-category');
    
    // Для каждого продукта проверяем его категорию
    products.forEach(product => {
        // Если категория 'all' или категория продукта совпадает с категорией кнопки
        if (category === 'all' || product.getAttribute('data-category') === category) {
            // Показываем продукт
            product.classList.remove('hidden');
        } else {
            // Скрываем продукт
            product.classList.add('hidden');
        }
    });

    // Удаляем класс 'active' у всех кнопок
    buttons.forEach(btn => btn.classList.remove('active'));
    // Добавляем класс 'active' нажатой кнопке
    button.classList.add('active');
});
});


// Получаем элемент с классом 'banner-slider'
const bannerSlider = document.querySelector('.banner-slider');
// Получаем все изображения в элементе 'banner-slider'
const images = document.querySelectorAll('.banner-slider img');

// Устанавливаем начальный индекс текущего изображения
let currentIndex = 0;

// Функция для показа следующего изображения
function nextImage() {
    // Скрываем текущее изображение
    images[currentIndex].style.display = 'none';
    // Увеличиваем индекс и зацикливаем его при достижении конца массива
    currentIndex = (currentIndex + 1) % images.length;
    // Показываем новое изображение
    images[currentIndex].style.display = 'block';
}

// Устанавливаем интервал для смены изображений каждые 3 секунды
setInterval(nextImage, 3000);

// Добавляем обработчик события 'submit' для формы с id 'contact-form'
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    openPopup(); // Открываем всплывающее окно
});

// Функция для открытия всплывающего окна
function openPopup() {
    // Показываем элемент с id 'overlay'
    document.getElementById("overlay").style.display = "block";
    clearForm(); // Очищаем форму
}

// Функция для закрытия всплывающего окна
function closePopup() {
    // Скрываем элемент с id 'overlay'
    document.getElementById("overlay").style.display = "none";
}

// Функция для очистки формы
function clearForm() {
    // Очищаем поле ввода с id 'name'
    document.getElementById("name").value = "";
    // Очищаем поле ввода с id 'phone'
    document.getElementById("phone").value = "";
    // Очищаем поле ввода с id 'message'
    document.getElementById("message").value = "";
}

// Добавляем обработчик события 'submit' для формы с id 'contact-form'
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    openPopup(); // Открываем всплывающее окно
    clearForm(); // Очищаем форму
});

