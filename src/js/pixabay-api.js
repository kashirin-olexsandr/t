import axios from 'axios';

const API_KEY = '45384673-88f77579824a7b83d33085da5';
const BASE_URL = 'https://pixabay.com/api/';

// Функция для выполнения HTTP-запроса
export async function fetchImages(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 15,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}