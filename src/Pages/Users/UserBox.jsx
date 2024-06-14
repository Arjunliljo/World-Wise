import { useUser } from "../../Components/Contexts/UserContext";
import styles from "./UserBox.module.css";
function UserBox({ userName, email, id}) {
  const { deleteUser } = useUser();
  return (
    <article className={styles.box}>
      <h3 className={styles.userName}>{userName}</h3>
      <p className={styles.email}>{email}</p>
      <button onClick={() => deleteUser(id)} className={styles.deleteBtn}>
        Delete user
      </button>
    </article>
  );
}

export default UserBox;
