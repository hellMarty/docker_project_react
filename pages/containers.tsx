import Link from 'next/link';
import { useEffect, useState } from 'react'
import { ContainerCard } from '../components/ContainerCard';
import Header from '../components/Header';
import styles from '../styles/Containers.module.css';
import ErrorButton from '../components/ErrorButton';

const filterStateList = [
    {
      label: "EXITED",
      value: "exited",
    },
    {
      label: "CREATED",
      value: "created",
    },
    {
      label: "RUNNING",
      value: "running",
    },
    {
      label: "PAUSED",
      value: "paused",
    },
  ];

const Containers = () => {
    const [containers, setContainers] = useState<any[]>([]);
    const [isError, setIsError] = useState(false);

    const data = { host: localStorage.getItem("host"), port: localStorage.getItem("port") };

    useEffect(() => {
        fetch('/api/containers/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    setContainers(data.data);
                } else {
                    setIsError(true);
                }
            })
    })

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
                    setfilterImageList(data.data.map((e) => {
                        if (e.RepoTags[0].split(":", 2)[1] === "latest") {
                            return e.RepoTags[0].split(":", 2)[0];
                        }
                        return e.RepoTags[0];

                    }));
                } else {
                    setIsError(true);
                }
            })
    }, []);

    const [filterImageList, setfilterImageList] = useState([]);


    const [filterState, setFilterState] = useState("none");
    const [filterImage, setFilterImage] = useState("none");

    return (
        <div>
            <Header/>
            <main className={styles.main}>
                {isError ? ( <ErrorButton /> ) : (
                    <div className={styles.container_list}>
                        <div className={styles.filter}>
                            <div className={styles.filter__option}>
                                <label className={styles.filter__text}>Filter by State:</label>
                                <select className={styles.filter__select} name="state" onChange={(o) => setFilterState(o.target.value)}>
                                    <option value="none" defaultChecked></option>
                                    {filterStateList.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.filter__option}>
                                <label className={styles.filter__text}>Filter by Image:</label>
                                <select className={styles.filter__select} name="image" onChange={(o) => setFilterImage(o.target.value)}>
                                    <option value="none" defaultChecked></option>
                                    {filterImageList.map((option) => (
                                        <option value={option}>{option.toLocaleUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Link href="/images"><div className={styles.button}>Add</div></Link>
                        {containers
                            .filter(container => (filterState === "none" || container.State === filterState) && (filterImage === "none" || (container.Image != undefined && container.Image.includes(filterImage))))
                            .map(container => <ContainerCard key={container.Id} name={container.Names[0].substring(1)} id={container.Id} image={container.Image} state={container.State} />)}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Containers;
