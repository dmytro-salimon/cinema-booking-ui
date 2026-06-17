import { TMDB_API_KEY } from '@env';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

let genresMap: Record<number, string> = {};

export const fetchMovies = async () => {
  try {
    if (Object.keys(genresMap).length === 0) {
      const genresRes = await fetch(`${API_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=uk-UA`);
      const genresData = await genresRes.json();
      
      if (genresData.genres) {
        genresData.genres.forEach((g: any) => {
          genresMap[g.id] = g.name;
        });
      }
    }

    const response = await fetch(`${API_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=uk-UA&page=1&region=UA`);
    
    if (!response.ok) throw new Error(`Помилка HTTP: ${response.status}`);

    const data = await response.json();

    const mappedMovies = data.results.map((movie: any) => ({
      id: movie.id.toString(),
      name: movie.title,
      genres: movie.genre_ids.map((id: number) => genresMap[id] || '').filter(Boolean), 
      image: {
        medium: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : 'https://via.placeholder.com/210x295',
        original: movie.poster_path ? `${IMAGE_BASE_URL}/original${movie.poster_path}` : 'https://via.placeholder.com/600x800',
      },
      backdropUrl: movie.backdrop_path ? `${IMAGE_BASE_URL}/w780${movie.backdrop_path}` : null,
      summary: movie.overview || 'Опис відсутній.',
      voteAverage: movie.vote_average,
    }));

    return mappedMovies;

  } catch (error) {
    console.error('Помилка при завантаженні фільмів з TMDB:', error);
    throw error;
  }
};


export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=uk-UA&append_to_response=videos,credits,release_dates`
    );

    if (!response.ok) throw new Error('Не вдалося завантажити деталі фільму');

    const data = await response.json();

    const releaseDates = data.release_dates?.results || [];
    const usRelease = releaseDates.find((r: any) => r.iso_3166_1 === 'US');
    const certification = usRelease?.release_dates[0]?.certification || 'NR';

    const trailers = data.videos?.results?.filter(
      (vid: any) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
    ) || [];

    const cast = data.credits?.cast?.slice(0, 10).map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
    })) || [];

    const year = data.release_date ? data.release_date.split('-')[0] : 'Невідомо';
    const director = data.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Невідомо';
    const production = data.production_countries?.map((c: any) => c.name).join(', ') || 'Невідомо';

    return {
      runtime: data.runtime,
      certification,
      trailers, 
      cast,
      year,
      director,
      production
    };

  } catch (error) {
    console.error('Помилка завантаження деталей:', error);
    throw error;
  }
};