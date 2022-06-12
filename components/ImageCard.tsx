import { useRouter } from 'next/router';
import styles from '../styles/Images.module.css';

export interface ImageCardProps {
    id: string,
    tags: string[],
    created: string,
    size: string,
}

export const ImageCard = (props: ImageCardProps) => {
    var realSize = (parseInt(props.size) / 1000000).toFixed(2)
    var nameAndTag = props.tags[0].split(":", 2)

    const router = useRouter()
    const createContainer = async () => {

        const data = {
            host: localStorage.getItem("host"),
            port: localStorage.getItem("port"),
            image: nameAndTag[0]
        };

        await fetch('/api/containers/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    router.push("/containers");
                } else {
                    router.push("/");
                }
            })
            .catch((error) => {
                router.push("/");
            });
    }

    return (
        <div className={styles.image_card}>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>ID:</p>
                <p className={styles.card_line_right}>{props.id}</p>
            </div>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>NAME:</p>
                <p className={styles.card_line_right}>{nameAndTag[0]}</p>
            </div>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>TAG:</p>
                <p className={styles.card_line_right}>{nameAndTag[1]}</p>
            </div>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>CREATED:</p>
                <p className={styles.card_line_right}>{props.created}</p>
            </div>
            <div className={styles.card_line}>
                <p className={styles.card_line_left}>SIZE:</p>
                <p className={styles.card_line_right}>{realSize} MB</p>
            </div>
            <div className={styles.button} onClick={createContainer}>
                New instance
            </div>
        </div>
    );
};

export default ImageCard;
