import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Contexts/Authenticate";
import PageNav from "../../Components/Navs/PageNav";

import Button from "../../Components/UtilityComponents/Button";
import styles from "./Login.module.css";

export default function Login() {
  const { password, setPassword, userName, setUserName, error, login } =
    useAuth();

  const navigate = useNavigate("");

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={login}>
        <div className={styles.row}>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
          {error && <span className={styles.notFound}>Invalid User Name</span>}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {error && <span className={styles.notFound}>Invalid Password</span>}
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
      <div className={styles.signup}>
        <span>Create an account ? </span>
        <Button type="secondary" onClick={() => navigate("/SignIn")}>
          Sign in
        </Button>
      </div>
    </main>
  );
}
