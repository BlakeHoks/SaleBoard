import { IoClose } from "react-icons/io5";
import styles from "./Hamburger.module.scss";
import Menu from "./Menu";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside.js";
import { AiOutlineMenu } from "react-icons/ai";

const Hamburger = ({ text }) => {
  const { isShow, ref, setIsShow } = useOnClickOutside(false);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button onClick={() => setIsShow(!isShow)}>
        {text}
        {isShow ? <IoClose /> : <AiOutlineMenu />}
      </button>
      <Menu isShow={isShow} />
    </div>
  );
};

export default Hamburger;
