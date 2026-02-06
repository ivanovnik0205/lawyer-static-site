// js/form-validation.js - Валидация форм
export function validateName(name) {
    if (name.length < 2) {
        return { isValid: false, error: 'Имя должно содержать минимум 2 символа' };
    }
    return { isValid: true };
}

export function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    const cleanedPhone = phone.replace(/\D/g, '');
    
    if (!phoneRegex.test(cleanedPhone)) {
        return { isValid: false, error: 'Введите корректный номер телефона (10-15 цифр)' };
    }
    return { isValid: true };
}