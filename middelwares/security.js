// middelwares/security.js

const sanitize = (req, res, next) => {
    const sanitizeObject = (obj) => {
        for (const key in obj) {
            if (key.startsWith('$') || key.includes('.')) {
                delete obj[key];
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitizeObject(obj[key]);
            }
        }
    };

    if (req.body) sanitizeObject(req.body);
    if (req.query) sanitizeObject(req.query);
    if (req.params) sanitizeObject(req.params);

    next();
};

const cleanXSS = (req, res, next) => {
    const xssCleanObject = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key]
                    .replace(/<script.*?>.*?<\/script>/gi, '')
                    .replace(/<.*?on.*?=.*?>/gi, '')
                    .replace(/javascript:/gi, '');
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                xssCleanObject(obj[key]);
            }
        }
    };

    if (req.body) xssCleanObject(req.body);
    if (req.query) xssCleanObject(req.query);
    if (req.params) xssCleanObject(req.params);

    next();
};

module.exports = { sanitize, cleanXSS };
