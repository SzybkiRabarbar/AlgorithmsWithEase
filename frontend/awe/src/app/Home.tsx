import styles from "./Home.module.scss";


export default function Home() {
  return (
    <div className={styles.Home} data-testid="Home">
      <span>Home</span>
    </div>
  );
}