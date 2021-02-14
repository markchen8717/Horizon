import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Choice from "../components/choice";

export default function Home() {
  const [inRoom, setInRoom] = useState(true);
  const questions = [
    {
      type: "subject",
      question: "Ninjas or Pirates?",
      a1: "Ninjas",
      a2: "Pirates",
      a1url:
        "https://purepng.com/public/uploads/large/purepng.com-ninjashinobininjacovert-agentassassinationguerrilla-warfaresamuraiclip-art-1421526960629zucts.png",
      a2url:
        "https://assets-mobilebaymag-com.s3.amazonaws.com/uploads/2017/05/Cascabel20Ashore456.jpg",
    },
    {
      type: "binary",
      question: "Do you take a lot of risks?",
      a1: "Yes",
      a2: "No",
    },
    {
      type: "image",
      question: "Which image resonates more with you?",
      a1url:
        "https://www.sustainability-times.com/wp-content/uploads/2019/11/leaves-3420078_960_720.jpg",
      a2url: "https://wallpapercave.com/wp/1y19ER5.jpg",
    },
    {
      type: "subject",
      question: "Harry Potter or Star Wars?",
      a1: "Harry Potter",
      a2: "Star Wars",
      a1url:
        "http://images.unsplash.com/photo-1527684651001-731c474bbb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxzZWFyY2h8Mnx8aGFycnklMjBwb3R0ZXJ8fDB8fHw&ixlib=rb-1.2.1&q=80&w=1080",
      a2url:
        "https://hdqwalls.com/wallpapers/star-wars-the-rise-of-skywalker-2019-4k-mz.jpg",
    },
    {
      type: "binary",
      question:
        "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo?",
      a1: "Yes",
      a2: "No",
    },
    {
      type: "image",
      question: "Which image resonates more with you?",
      a1url:
        "https://images-na.ssl-images-amazon.com/images/I/81K69hobZeL._SL1500_.jpg",
      a2url:
        "https://ctl.s6img.com/society6/img/IDG_-og9UUn4_CyEeBJhfSTCLrI/w_1500/canvas/~artwork/s6-original-art-uploads/society6/uploads/misc/02a700c2440d43eaacd39ca7176e9ae9/~~/sun-painting-canvas.jpg",
    },
  ];
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const nextQuestion = (response) => {
    setResponses([...responses, response]);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      console.log("RESPONSES:\n");
      var i;
      for (i = 0; i < responses.length; i++) {
        console.log(responses[i]);
      }
      // call machine learning stuff and end screen
    }
  };

  if (inRoom) {
    return <Choice question={questions[index]} nextQuestion={nextQuestion} />;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>buffalo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.horizon}>Horizon</div>
          <div className={styles.search_box}>
            <input
              className={styles.search_bar}
              type="text"
              placeholder="Enter Code"
            />
          </div>
          <div className={styles.search_box}>
            <input
              className={styles.search_bar}
              type="text"
              placeholder="Name"
            />
          </div>
        </main>

        <footer className={styles.footer}>
          Built for CalgaryHacks by Justin Chu, Sam Prokopchuk, Mark Chen, and
          Connor Ibbotson
        </footer>
      </div>
    );
  }
}
