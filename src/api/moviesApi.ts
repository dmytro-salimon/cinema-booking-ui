const API_BASE_URL = 'https://api.tvmaze.com';

export const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`);
    
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.slice(0, 20);
  } catch (error) {
    console.error('Помилка при завантаженні фільмів:', error);
    throw error;
  }
};