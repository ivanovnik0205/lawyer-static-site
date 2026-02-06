// js/utils.js - Вспомогательные функции
export function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function formatPhone(phone) {
    // Форматирование телефона: 89991234567 -> +7 (999) 123-45-67
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `+${cleaned[0]} (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 9)}-${cleaned.substring(9, 11)}`;
    }
    return phone;
}