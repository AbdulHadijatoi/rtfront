import api from "../../utils/Api";

const API_KEY = 'AY9UWF2R84TNIGBJ'; // Replace with your actual Alpha Vantage API key
const BASE_URL = 'https://www.alphavantage.co/query';

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        const response = await api.get(BASE_URL, {
            params: {
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: fromCurrency,
                to_currency: toCurrency,
                apikey: API_KEY,
            },
        });

        const exchangeRate = response.data['Realtime Currency Exchange Rate'];
        if (!exchangeRate) {
            throw new Error('Exchange rate not available');
        }

        const conversionRate = parseFloat(exchangeRate['5. Exchange Rate']);
        if (isNaN(conversionRate)) {
            throw new Error('Invalid exchange rate');
        }

        return amount * conversionRate;
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
        return null;
    }
};
