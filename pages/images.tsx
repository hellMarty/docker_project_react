import Link from 'next/link';
import { useEffect, useState } from 'react'
import { ImageCard } from '../components/ImageCard';
import Header from '../components/Header';
import styles from '../styles/Images.module.css'
import ErrorButton from '../components/ErrorButton';

const Images = () => {
    const [Images, setImages] = useState<any[]>([]);
    const [isError, setIsError] = useState(false);

    const data = { host: localStorage.getItem("host"), port: localStorage.getItem("port") };

    useEffect(() => {
        fetch('/api/images/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    setImages(data.data);
                    console.log('Success:', data);
                } else {
                    setIsError(true);
                    console.log("Error", data);
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            });

    })

    return (
        <div>
            <Header  />
            <main className={styles.main}>
                {isError ? ( <ErrorButton /> ) : (
                    <div className={styles.image_list}>
                        <Link href="/search"><div className={styles.button}>Pull new image</div></Link>
                        {Images.map(image => <ImageCard key={image.Id} id={image.Id} tags={image.RepoTags} created={image.Created} size={image.Size} />)}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Images;
