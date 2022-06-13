import Header from '../components/Header';
import styles from '../styles/Container.module.css';
import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import ErrorButton from '../components/ErrorButton';

export const Container = () => {
  const router = useRouter();
  const id = router.query.id;

  const [isLoaded, setIsLoaded] = useState(false);
  const [container, setContainer] = useState<any>();

  const data = { host: localStorage.getItem("host"), port: localStorage.getItem("port"), containerId: id };

  useEffect(() => {
    fetch('/api/container', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => {
        setIsLoaded(true);
        console.log('Success:', data);
        if (data.status == "success") {
          setContainer(data.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      });
  });

  return (
    <div>
      <Header />
      <div className={styles.main} >
        {!container ? ( <ErrorButton /> ) : (
            <div>
              <h2 className={styles.name}>{container.Name.substring(1)} </h2>
              < div className={styles.container__card} style={{ cursor: "unset" }}>

                <div className={styles.line}>
                  <p className={styles.line_left}> ID:</p>
                  < p className={styles.line_right} > {container.Id} </p>
                </div>
                < div className={styles.line}>
                  <p className={styles.line_left}> STATE:  </p>
                  < p className={styles.line_right} > {container.State.Status.toLocaleUpperCase()} </p>
                </div>
                < div className={styles.line}>
                  <p className={styles.line_left}> CREATED: </p>
                  <p className={styles.line_right} > {new Date(Date.parse(container.Created)).toUTCString()} </p>
                </div>
                <div className={styles.buttons}>

                  <div><div onClick={() => startThisContainer(data)} className={styles.button}>
                    Start
                  </div>
                    <div onClick={() => pauseThisContainer(data)} className={styles.button}>
                      Pause
                    </div>
                    <div onClick={() => deleteThisContainer(data, router)} className={styles.button}>
                      Delete
                    </div>

                    
                  </div>
                  <div>
                    
                    <div onClick={() => stopThisContainer(data)} className={styles.button}>
                      Stop
                    </div>
                    <div onClick={() => killThisContainer(data)} className={styles.button}>
                      Kill
                    </div>
                    <div onClick={() => getContainerLogs(data, router)} className={styles.button}>
                      Logs
                    </div>
                  </div>
                </div>

              </div>

            </div>
        )}
      </div>
    </div>
  );
};

function startThisContainer(data: any) {
  fetch('/api/containers/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .catch((error) => {
      console.error('Error:', error)
    });
}

function stopThisContainer(data: any) {
  fetch('/api/containers/stop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .catch((error) => {
      console.error('Error:', error)
    });
}

function pauseThisContainer(data: any) {
  fetch('/api/containers/pause', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .catch((error) => {
      console.error('Error:', error)
    });
}

function killThisContainer(data: any) {
  fetch('/api/containers/kill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .catch((error) => {
      console.error('Error:', error)
    });
}

function deleteThisContainer(data: any, router: NextRouter) {
  fetch('/api/container', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => router.push("/containers"))
    .catch((error) => {
      console.error('Error:', error)
    });
}

function getContainerLogs(data: any, router: NextRouter) {
  router.push({
    pathname: '/logs',
    query: { containerId: data.containerId },
  })
}

export default Container;
