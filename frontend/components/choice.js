import styles from "../styles/Choice.module.css";
import { useState, useEffect, useRef } from "react";
import { Fade, Slide } from "react-reveal";
import ReactAudioPlayer from "react-audio-player";

export default function Choice(props) {
  const [seconds, setSeconds] = useState(1);
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [choice, setChoice] = useState(0);
  const foo = useRef();

  useEffect(() => {
    function tick() {
      setSeconds((prevSeconds) => prevSeconds - 1);
      if (Math.random() > 0.4) {
        if (Math.random() > 0.8) {
          setUsers((users) => [...users, seconds, seconds]);
        }
        setUsers((users) => [...users, seconds]);
      }
      if (Math.random() > 0.5) {
        if (Math.random() > 0.8) {
          setUsers1((users) => [...users, seconds, seconds]);
        }
        setUsers1((users) => [...users, seconds]);
      }
    }
    foo.current = setInterval(() => tick(), 1000);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setChoice(-1);
      setTimeout(() => {
        setSeconds(1);
        setChoice(0);
        setUsers([]);
        setUsers1([]);
        if (choice == 0) {
          props.nextQuestion(-1);
        } else {
          props.nextQuestion(choice);
        }
      }, 1000);
    }
  }, [seconds]);

  const User = () => (
    <svg
      style={{ height: 30, width: 30 }}
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
          <p className={styles.username}>Username: {props.username}</p>
          <p className={styles.session}>Session: {props.session}</p>
          <div className={styles.imageContainer}>
            <div
              className={styles.side}
              style={
                props.question.type == "binary"
                  ? { backgroundColor: "#17B890" }
                  : {
                      background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${props.question.Img1}) 50% 50% / cover no-repeat`,
                    }
              }
            >
              <button
                className={styles.button}
                onClick={() => setChoice(-1)}
                style={
                  choice == -1
                    ? { backgroundColor: "#17B890", transform: "scale(1.1)" }
                    : {}
                }
              >
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
              <div
                className={styles.users}
                style={
                  users.length > 16
                    ? { marginTop: 40, marginBottom: -158 }
                    : users.length > 8
                    ? {
                        marginTop: 40,
                        marginBottom: -116,
                      }
                    : users.length == 0
                    ? {}
                    : { marginTop: 40, marginBottom: -74 }
                }
              >
                {users.map((user, index) => {
                  return (
                    <Slide key={index} bottom>
                      <User />
                    </Slide>
                  );
                })}
              </div>
            </div>
            <div className={styles.countdown}>{seconds}</div>
            <div
              style={
                props.question.type == "binary"
                  ? { backgroundColor: "#D62246" }
                  : {
                      background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${props.question.Img2}) 50% 50% / cover no-repeat`,
                    }
              }
              className={styles.side}
            >
              <button
                className={styles.button}
                onClick={() => setChoice(1)}
                style={
                  choice == 1
                    ? { backgroundColor: "#17B890", transform: "scale(1.1)" }
                    : {}
                }
              >
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
              <div
                className={styles.users}
                style={
                  users1.length > 16
                    ? { marginTop: 40, marginBottom: -158 }
                    : users1.length > 8
                    ? {
                        marginTop: 40,
                        marginBottom: -116,
                      }
                    : users1.length == 0
                    ? {}
                    : { marginTop: 40, marginBottom: -74 }
                }
              >
                {users1.map((user, index) => {
                  return (
                    <Slide key={index} bottom>
                      <User />
                    </Slide>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
