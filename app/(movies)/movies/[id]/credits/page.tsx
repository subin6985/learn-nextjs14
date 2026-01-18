import styles from "../../../../../styles/movie-credits.module.css";
import {getMovie} from "../../../../../components/movie-info";
import Link from "next/link";
import {API_URL} from "../../../../api";

// 타입 정의 추가
interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export async function generateMetadata({params}:{params:{id:string}}) {
  const {id} = await params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} Credits`,
  }
}

async function getCredits(id: string): Promise<Credit[]> {
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();
}

export default async function MovieCredits({params}:{params:{id:string}}) {
  const {id} = await params;

  const movie = await getMovie(id);
  const credits = await getCredits(id);

  return (
      <div>
        <Link className={styles.title}
              href={`/movies/${movie.id}`}
        >&larr; {movie.title}</Link>
        <div className={styles.container}>
          {credits.map(credit => (
              <div key={credit.id}>
                <img
                    src={credit.profile_path}
                    alt={credit.name}
                />
                <h3>{credit.name}</h3>
                <h3 className={styles.character}>{credit.character}</h3>
              </div>))}
        </div>
      </div>
  );
}