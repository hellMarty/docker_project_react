import { NextRouter, useRouter } from 'next/router';
import styles from '../styles/Images.module.css';

export interface SearchCardProps {
    stars: string,
    official: string,
    name: string,
    automated: string,
    description: string,
}

export const SearchCard = (props: SearchCardProps) => {
    const router = useRouter();
    const data = { host: localStorage.getItem("host"), port: localStorage.getItem("port"), image: props.name };

    function createImage(data: any, router: NextRouter) {

        fetch('/api/images/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(() => router.push("/images"))
            .catch((error) => {
                console.error('Error:', error)
            });
    }

    return (
        <div className={styles.image_card_clickable} onClick={() => createImage(data, router)}>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>NAME:</p>
                <p className={styles.card_line_right}>{props.name}</p>
            </div>

            <div className={styles.card_line}>
                <p className={styles.card_line_left}>STARS:</p>
                <p className={styles.card_line_right}>{props.stars}</p>
            </div>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>IS OFFICIAL:</p>
                <p className={styles.card_line_right}>{props.official}</p>
            </div>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>IS AUTOMATED:</p>
                <p className={styles.card_line_right}>{props.automated}</p>
            </div>
            <div className={styles.description}>
                <p className={styles.card_line_left}>DESCRIPTION:</p>
                <p className={styles.description__text}>{props.description}</p>
            </div>
        </div>
    );
};

export default SearchCard;
