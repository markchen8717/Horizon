import styles from "../styles/Choice.module.css";
import { useState, useEffect, useRef } from "react";
import Fade from "react-reveal/Fade";

export default function Choice(props) {
  const [seconds, setSeconds] = useState(15);
  const foo = useRef();

  useEffect(() => {
    function tick() {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }
    foo.current = setInterval(() => tick(), 1000);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      handleClick(0);
    }
  }, [seconds]);

  const handleClick = (response) => {
    setSeconds(15);
    props.nextQuestion(response);
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
    <Fade>
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
              <button className={styles.button} onClick={() => handleClick(-1)}>
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
            <div className={styles.countdown}>{seconds}</div>
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
    </Fade>
  );
}
