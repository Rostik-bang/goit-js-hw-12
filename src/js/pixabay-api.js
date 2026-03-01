import axios from 'axios';

const API_KEY = '54847026-fc22f2464403aa7b57f5b9274';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page, // ✅ додаємо номер сторінки
    per_page: 15, // ✅ обов’язково мінімум 15
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Info about error', error);
    throw error;
  }
}
