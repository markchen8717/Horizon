import styles from "../styles/Connect.module.css";

export default function Connect(props) {
  const dummy_obj = { uuid: "groupid", users: ["Mark", "Connor"] };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Match:</h1>
      {dummy_obj.users.map((user, index) => {
        if (user !== "Connor") {
          return <div className={styles.group}>{user}</div>;
        }
      })}
    </div>
  );
}
