import styles from "../styles/Login.module.css";
import { useSelector } from "react-redux";

const Tweet = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <h1>Tweet</h1>
      {user.username}
    </div>
  );
};

export default Tweet;
