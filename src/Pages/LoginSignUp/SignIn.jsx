import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Contexts/Authenticate";
import PageNav from "../../Components/LayoutComponents/PageNav";

import Button from "../../Components/UtilityComponents/Button";
import styles from "./Login.module.css";
import Spinner from "../../Components/LayoutComponents/Spinner";

export default function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    addUser,
    isLoading,
  } = useAuth();

  const navigate = useNavigate("");

  const handleSingin = async () => {
    await addUser();
  };

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSingin}>
        <div className={styles.row}>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
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
        </div>

        <div>
          {isLoading ? <Spinner /> : <Button type="primary">Sign up</Button>}
        </div>
      </form>
      <div className={styles.signup}>
        <span>Already having Account ? </span>
        <Button onClick={() => navigate("/Login")} type="secondary">
          Login
        </Button>
      </div>
    </main>
  );
}
