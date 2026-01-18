import styles from "../../../../../styles/movie-similar.module.css";
import Movie from "../../../../../components/movie";
import {API_URL} from "../../../../(home)/page";
import {getMovie} from "../../../../../components/movie-info";
import Link from "next/link";

export async function generateMetadata({params}:{params:{id:string}}) {
  const {id} = await params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} Similar`,
  }
}

async function getSimilar(id: string) {
  const response = await fetch(`${API_URL}/${id}/similar`);
  return response.json();
}

export default async function SimilarPage({params}:{parmas:{id:string}}) {
  const {id} = await params;

  const movie = await getMovie(id);
  const movies = await getSimilar(id);

  return (
      <div>
        <Link className={styles.title}
              href={`/movies/${movie.id}`}
        >&larr; {movie.title}</Link>
        <div className={styles.container}>
          {movies.map(movie => (
              <Movie key={movie.id} title={movie.title} id={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
      </div>
  );
}