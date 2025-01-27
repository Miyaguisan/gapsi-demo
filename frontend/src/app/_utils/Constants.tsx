const DEFAULT_PRESENTATION_TIME = 150;
const DEFAULT_MONEY_FORMATTER = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const API_URL = 'http://localhost:4000/api';

const MODAL_PRESENTATION_TIME = DEFAULT_PRESENTATION_TIME; // Ajustar a gusto, por defecto DEFAULT_PRESENTATION_TIME

const NOTIFICATION_PRESENTATION_TIME = DEFAULT_PRESENTATION_TIME; // Ajustar a gusto, por defecto DEFAULT_PRESENTATION_TIME
const NOTIFICATION_TIMEOUT = 5000;

const PROVIDERS_PER_PAGE = 10;
const PROVIDERS_STATUS_COLORS = {
    'active': '#A2D800',
    'inactive': '#E63A39',
    'pending': '#FF8001',
};


export {
    DEFAULT_MONEY_FORMATTER,
    API_URL,
    MODAL_PRESENTATION_TIME,
    NOTIFICATION_PRESENTATION_TIME,
    NOTIFICATION_TIMEOUT,
    PROVIDERS_PER_PAGE,
    PROVIDERS_STATUS_COLORS,
};
