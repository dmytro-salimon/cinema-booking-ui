// src/api/moviesApi.ts

// Константи для URL API (вимога чистоти коду)
const API_BASE_URL = 'https://api.tvmaze.com';

/**
 * Функція для отримання списку фільмів/серіалів.
 * Використовує Fetch API для відправки GET-запиту.
 */
export const fetchMovies = async () => {
  try {
    // Відправляємо GET-запит до публічного API
    const response = await fetch(`${API_BASE_URL}/shows`);
    
    // Перевіряємо, чи успішна відповідь сервера (статус 200-299)
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    // Парсимо відповідь у форматі JSON
    const data = await response.json();
    
    // Повертаємо перші 20 результатів для нашого списку прем'єр
    return data.slice(0, 20);
  } catch (error) {
    // Логуємо помилку для розробника і прокидаємо її далі для обробки в UI
    console.error('Помилка при завантаженні фільмів:', error);
    throw error;
  }
};