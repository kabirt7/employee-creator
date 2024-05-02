import styles from "./Home.module.scss";
import logoImage from "../../assets/empLogo.svg";

interface HomeProps {
  setPageTitle: Function;
}

const Home = ({ setPageTitle }: HomeProps) => {
  setPageTitle("Home Page");
  return (
    <div className={styles.home}>
      <main>
        <div>
          <img src={logoImage} alt="logo" />
          <h1>EMPLO</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
