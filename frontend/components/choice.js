import styles from "../styles/Choice.module.css";
import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";

export default function Choice(props) {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [initialTime, setInitialTime] = useState(15);

  useEffect(() => {
    console.log(props.question.a1);
    if (initialTime > 0) {
      setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);
    } else {
      // render new question
    }
  }, [initialTime]);

  const handleClick = () => {
    props.nextQuestion();
  };

  return (
    <animated.div style={fadeIn} className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.question}>{props.question.question}</h1>
        <div className={styles.imageContainer}>
          <div className={styles.buttonContainer}>
            <img className={styles.image} src={props.question.a1} />
            <button
              className={styles.button}
              style={{ backgroundColor: "#3180FF" }}
              onClick={handleClick}
            >
              Dogs!
            </button>
          </div>
          <div className={styles.countdown}>{initialTime}</div>
          <div className={styles.buttonContainer}>
            <img className={styles.image} src={props.question.a2} />
            <button
              className={styles.button}
              style={{ backgroundColor: "#d61204" }}
              onClick={handleClick}
            >
              Cats!
            </button>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
