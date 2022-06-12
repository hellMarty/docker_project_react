import styles from '../styles/Header.module.css';
import Link from 'next/link'

export const Header = (props) => (
  
  <header className={styles.header}>
    
    <h1 className={styles.title}><Link href="/">
      <b>Container App</b>
    </Link></h1>
    <div className={styles.bar} style={{ visibility: props.visibility }}>
      <Link href="/containers">
        <div className={styles.bar__option}>
          <b>Containers</b>
        </div>
        </Link>

        <Link href="/images">

        <div className={styles.bar__option}>
          <b>Images</b>
        </div>
      </Link>
      
    </div>
  </header>
);

export default Header;
