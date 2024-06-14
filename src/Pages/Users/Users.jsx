import styles from "./Users.module.css";
import PageNav from "../../Components/Navs/PageNav";
import UserBox from "./UserBox";

function Users() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <PageNav>{["3.5rem", "5rem"]}</PageNav>
        <div className={styles.grid}>
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
        </div>
      </section>
    </main>
  );
}

export default Users;
