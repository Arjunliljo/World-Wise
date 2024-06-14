import styles from "./Users.module.css";
import PageNav from "../../Components/Navs/PageNav";
import UserBox from "./UserBox";
import { useUser } from "../../Components/Contexts/UserContext";
import SpinnerFullPage from "../../Components/UtilityComponents/SpinnerFullPage";
import Error from "../../Components/UtilityComponents/Error";

function Users() {
  const { users, isLoading, error } = useUser();
  console.log(users);
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <PageNav>{["3.5rem", "5rem"]}</PageNav>

        {isLoading && !error && <SpinnerFullPage />}
        {error && <Error message={error} />}

        {!isLoading && !error && (
          <div className={styles.grid}>
            {users.map(({ userName, email, _id }) => (
              <UserBox id={_id} userName={userName} email={email} key={_id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Users;
