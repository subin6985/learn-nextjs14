import {API_URL} from "../../../../(home)/page";
import styles from "../../../../../styles/movie-providers.module.css";
import {getMovie} from "../../../../../components/movie-info";
import Link from "next/link";

export async function generateMetadata({params}:{params:{id:string}}) {
  const {id} = await params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} Providers`,
  }
}

async function getProviders(id: string) {
  const response = await fetch(`${API_URL}/${id}/providers`);
  return response.json();
}

export default async function MovieProviders({params}:{params:{id:string}}) {
  const {id} = await params;

  const movie = await getMovie(id);
  const providers = await getProviders(id);

  return (
      <div>
        <Link className={styles.title}
              href={`/movies/${movie.id}`}
        >&larr; {movie.title}</Link>
        {Object.keys(providers).length === 0 ? (
            <p className={styles.no}>No providers avaliable</p>
        ) : (
            <div className={styles.container}>
              {Object.entries(providers).map(([countryCode, data]) => (
                  <div className={styles.part} key={countryCode}>
                    <Link className={styles.country}
                          href={providers[countryCode].link}
                    >{countryCode}</Link>
                    {data.buy && (
                        <div>
                          <h3>Buy</h3>
                          <div className={styles.wrapper}>
                            {data.buy.map((provider) => (
                                <div key={provider.provider_id}>
                                  <img src={provider.logo_path} />
                                  <p>{provider.provider_name}</p>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}
                    {data.rent && (
                        <div>
                          <h3>Rent</h3>
                          <div className={styles.wrapper}>
                            {data.rent.map((provider) => (
                                <div key={provider.provider_id}>
                                  <img src={provider.logo_path} />
                                  <p>{provider.provider_name}</p>
                                </div>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}