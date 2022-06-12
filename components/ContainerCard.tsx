import Link from 'next/link';
import styles from '../styles/Containers.module.css';

export interface ContainerCardProps {
    name: string,
    id: string,
    image: string,
    state: string,
}

export const ContainerCard = (props: ContainerCardProps) => {
    return (
        <Link href={{ pathname: "/container", query: { id: props.id } }} >
            <div className={styles.container_card}>
                <div className={styles.card_line}>
                    <p className={styles.card_line_left}>NAME:</p>
                    <p className={styles.card_line_right}>{props.name}</p>
                </div>
                <div className={styles.card_line}>
                    <p className={styles.card_line_left}>ID:</p>
                    <p className={styles.card_line_right}>{props.id.substring(0, 12)}</p>
                </div>
                <div className={styles.card_line}>
                    <p className={styles.card_line_left}>IMAGE:</p>
                    <p className={styles.card_line_right}>{props.image}</p>
                </div>
                <div className={styles.card_line}>
                    <p className={styles.card_line_left}>STATE:</p>
                    <p className={styles.card_line_right}>{props.state.toLocaleUpperCase()}</p>
                </div>
            </div>
        </Link>
    );
};

