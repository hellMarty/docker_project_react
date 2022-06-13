import { useRouter } from 'next/router';
import styles from '../styles/ErrorButton.module.css'

export const ErrorButton = () => {
    const router = useRouter();

    const errorButton = (e) => {
        e.preventDefault();
        router.push("/");
    }

    return (
        <div className={styles.error__div}>
            <div>Error</div>
            <button type="button" onClick={errorButton} className={styles.error__button}>Try Again</button>
            <div style={{ fontSize: "0.7rem" }}>Check if Docker Desktop is running.</div>
        </div>
    );
};

export default ErrorButton;