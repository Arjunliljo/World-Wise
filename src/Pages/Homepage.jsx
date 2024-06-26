import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../Components/Navs/PageNav";
import { useAuth } from "../Components/Contexts/Authenticate";

export default function Homepage() {
  const { LOGGED_IN } = useAuth();

  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={LOGGED_IN ? "/app" : "/SignIn"} className="cta">
          Start tracking
        </Link>
      </section>
    </main>
  );
}
