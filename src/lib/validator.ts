export const isValidEmail = (email: string): boolean => {
    // RFC 5322 compliant-ish regex for robust email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
    // Normalize: remove spaces, dashes, parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    // Check if it contains only digits and optional leading +
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    return phoneRegex.test(cleanPhone);
};

export const sanitizeInput = (input: string): string => {
    if (!input) return '';
    // Strip potential XSS characters (<, >, script, etc)
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;")
        .trim();
};
