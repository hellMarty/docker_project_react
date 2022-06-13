import { createContext, useState } from 'react'
import styles from '../styles/Images.module.css'
import { SearchCard } from '../components/SearchCard';
import Header from '../components/Header';

export const DockerContext = createContext(null)

const Search = () => {

    const [images, setImages] = useState<any[]>([]);
    const [isError, setIsError] = useState(false);

    const searchImages = async (event) => {
        event.preventDefault()

        const data = {
            host: localStorage.getItem("host"),
            port: localStorage.getItem("port"),
            term: event.target.term.value
        };

        await fetch('/api/images/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    setImages(data.data)
                    console.log('Success:', data);
                } else {
                    setIsError(true);
                    console.log("Error", data);
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            });
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                
                <div className={styles.image_list}>
                    <form className={styles.filter} onSubmit={searchImages}>
                        <label htmlFor="term">Search Image:</label>
                        <input
                            type="text"
                            id="term"
                            name="term"
                            placeholder="postgres" />
                        <button type="submit">Search</button>
                    </form>

                    {images.length > 0 &&
                        <div>
                            {
                                images.map(image => <SearchCard stars={image.star_count} official={image.is_official.toString()}
                                    name={image.name} automated={image.is_automated.toString()} description={image.description} />)
                            }
                        </div>
                    }
                </div>
            </main>
        </>
    );

}

export default Search
