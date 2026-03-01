import axios from 'axios';

const API_KEY = '54847026-fc22f2464403aa7b57f5b9274';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  try {
    const response = await axios.get(BASE_URL, { params });

    return response.data;
  } catch (error) {
    console.error('Info about error', error);
    throw error;
  }
}
