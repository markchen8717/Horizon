import styles from "../styles/Choice.module.css";
import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";

export default function Choice(props) {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [initialTime, setInitialTime] = useState(15);

  useEffect(() => {
    if (initialTime > 0) {
      setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);
    } else {
      // render new question
      // handleClick(0);
    }
  }, [initialTime]);

  const handleClick = (response) => {
    setTimeout(() => {
      setInitialTime(15);
      props.nextQuestion(response);
    }, 500);
  };

  const User = () => (
    <svg
      style={{ height: 20, width: 20 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="white"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.question}>{props.question.question}</h1>
        <p className={styles.username}>Username</p>
        <p className={styles.session}>SessionID</p>
        <div className={styles.imageContainer}>
          <div
            className={styles.side}
            style={
              props.question.type == "binary"
                ? { backgroundColor: "#17B890" }
                : {
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${props.question.a1url}) 50% 50% / cover no-repeat`,
                  }
            }
          >
            <button className={styles.button} onClick={() => handleClick(0)}>
              {props.question.type == "image" ? (
                <svg
                  style={{ height: 50, width: 50, marginBottom: -8 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                props.question.a1
              )}
            </button>
            {/* <div>
              <User />
            </div> */}
          </div>
          <div className={styles.countdown}>{initialTime}</div>
          <div
            style={
              props.question.type == "binary"
                ? { backgroundColor: "#D62246" }
                : {
                    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${props.question.a2url}) 50% 50% / cover no-repeat`,
                  }
            }
            className={styles.side}
          >
            <button className={styles.button} onClick={() => handleClick(1)}>
              {props.question.type == "image" ? (
                <svg
                  style={{ height: 50, width: 50, marginBottom: -8 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                props.question.a2
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
