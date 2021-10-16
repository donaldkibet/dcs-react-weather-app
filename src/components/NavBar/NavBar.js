import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { GiModernCity } from 'react-icons/gi';

const NavBar = () => {
  return (
    <nav className={styles.navBarWrapper}>
      <Link className={styles.link} to="/">
        <AiFillHome size={15} /> Home
      </Link>
      <div className={styles.rightLinks}>
        <Link className={styles.link} to="/add-city">
          Add City <GiModernCity size={20} />
        </Link>
        <Link className={styles.link} to="/search">
        Search <AiOutlineSearch size={20} /> 
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
