import { createContext } from 'react'
import styles from '../styles/Index.module.css'
import { useRouter } from 'next/router';
import Header from '../components/Header';

export const DockerContext = createContext(null)

const Index = () => {
  const router = useRouter()
  const connectDocker = async (event) => {
    event.preventDefault()


    var hostAndPort: string[] = event.target.address.value.split(":", 2)

    localStorage.setItem('host', hostAndPort[0])
    localStorage.setItem('port', hostAndPort[1])
    router.push('/containers')

  }

  return (
    <div className={styles.main}>
      <Header visibility="hidden"/>

      <div className={styles.body}>

        <div className={styles.login}>
          <label className={styles.text} htmlFor="address">Address and port</label>
          <form className={styles.form} onSubmit={connectDocker}>
            <input
              type="text"
              id="address"
              name="address"
              required
              pattern="[^:]*:[0-9]{1,5}" />
            <button className={styles.button} type="submit">Connect</button>
          </form>

      </div>
        
      </div>
    </div>
  )
}

export default Index
