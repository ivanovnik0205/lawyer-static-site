// js/main.js - Главный файл JavaScript

// Импортируем модули
import { SITE_NAME, CONTACT_PHONE } from './config.js';
import { formatPrice, getCurrentYear } from './utils.js';
import { validateName, validatePhone } from './form-validation.js';
import { ReviewSlider } from './slider.js';
import { initModal, showSuccessMessage } from './modal.js';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Сайт загружен! Модульная структура работает.');
    
    // 1. Обновляем заголовок
    const header = document.querySelector('.header h1');
    if (header) {
        header.innerHTML = `${SITE_NAME} <span style="color:#3498db">+</span>`;
    }
    
    // 2. Обновляем год в футере
    const yearElement = document.getElementById('footer-year');
    if (yearElement) {
        yearElement.textContent = `© ${getCurrentYear()} ${SITE_NAME}`;
    }
    
    // 3. Инициализируем слайдер отзывов
    if (document.querySelector('.review-slider')) {
        const slider = new ReviewSlider('.review-slider');
        slider.init();
    }
    
    // 4. Инициализируем модальные окна
    initModal();
    
    // 5. Назначаем обработчики формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateAndSendForm();
        });
    }
    
    // 6. Обновляем цены (пример использования formatPrice)
    document.querySelectorAll('.price').forEach(priceElement => {
        const priceText = priceElement.textContent;
        const priceNumber = parseInt(priceText.replace(/\D/g, ''));
        if (priceNumber) {
            priceElement.textContent = formatPrice(priceNumber);
        }
    });
});

// Функция заказа услуги (должна быть доступна глобально для onclick)
window.orderService = function(serviceName, price) {
    console.log(`Заказ услуги: ${serviceName}, Цена: ${price} руб.`);
    
    const message = `
        <h3 style="color: #27ae60;">✅ Заявка на "${serviceName}" отправлена!</h3>
        <p>Стоимость: <strong>${formatPrice(price)}</strong></p>
        <p>Наш юрист свяжется с вами для уточнения деталей</p>
    `;
    
    showSuccessMessage(message);
    incrementRequestCount();
};

// Валидация и отправка формы (также глобально)
window.validateAndSendForm = function() {
    console.log('Проверка формы...');
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Сбрасываем ошибки
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    
    let isValid = true;
    
    // Используем импортированные функции валидации
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
        document.getElementById('name-error').textContent = nameValidation.error;
        isValid = false;
    }
    
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
        document.getElementById('phone-error').textContent = phoneValidation.error;
        isValid = false;
    }
    
    if (isValid) {
        sendForm(name, phone, message);
    }
};

// Локальное хранилище (оставляем здесь, так как маленькая функция)
function incrementRequestCount() {
    let count = parseInt(localStorage.getItem('lawyerRequestCount') || 0);
    count++;
    localStorage.setItem('lawyerRequestCount', count);
    document.getElementById('request-count').textContent = count;
}

function sendForm(name, phone, message) {
    // Здесь будет отправка на сервер
    console.log('Данные формы:', { name, phone, message });
    
    const successMessage = `
        <h3 style="color: #27ae60;">✅ Заявка отправлена!</h3>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Проблема:</strong> ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}</p>
    `;
    
    showSuccessMessage(successMessage);
    incrementRequestCount();
    
    // Очищаем форму
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
}