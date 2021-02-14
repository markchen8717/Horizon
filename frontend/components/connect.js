import styles from "../styles/Connect.module.css";
import { Bounce } from "react-reveal";
import { Loading } from "react-loading-dot";

export default function Connect(props) {
  return (
    <div className={styles.container}>
      {props.loading ? (
        <Loading background="rgb(255, 255, 255)" duration="0.5s" />
      ) : (
        <>
          <div className={styles.overlay} />
          <Bounce>
            <div className={styles.modal}>
              <h3 style={{ margin: 0, marginBottom: 20 }}>
                Congratulations! Your group is:
              </h3>
              {props.group.map((user, index) => {
                return <h1 key={index} className={styles.group}>{user}<span style={{fontSize: 16}}>{user == props.username && "(you)"}</span></h1>;
              })}
              <button
                className={styles.button}
                style={{ marginTop: 35 }}
                // onClick={endSession}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Connect!</span>
                  <span style={{ fontSize: 10 }}>(Coming Soon)</span>
                </div>
              </button>
            </div>
          </Bounce>
        </>
      )}
    </div>
  );
}
