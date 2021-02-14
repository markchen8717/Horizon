import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Choice from "../components/choice";
import Connect from "../components/connect";
import { Fade, Bounce } from "react-reveal";
// import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Home() {
  // const questions = [
  //   {
  //     type: "subject",
  //     question: "Ninjas or Pirates?",
  //     a1: "Ninjas",
  //     a2: "Pirates",
  //     a1url:
  //       "https://purepng.com/public/uploads/large/purepng.com-ninjashinobininjacovert-agentassassinationguerrilla-warfaresamuraiclip-art-1421526960629zucts.png",
  //     a2url:
  //       "https://assets-mobilebaymag-com.s3.amazonaws.com/uploads/2017/05/Cascabel20Ashore456.jpg",
  //   },
  //   {
  //     type: "binary",
  //     question: "Do you take a lot of risks?",
  //     a1: "Yes",
  //     a2: "No",
  //   },
  //   {
  //     type: "image",
  //     question: "Which image resonates more with you?",
  //     a1url:
  //       "https://www.sustainability-times.com/wp-content/uploads/2019/11/leaves-3420078_960_720.jpg",
  //     a2url: "https://wallpapercave.com/wp/1y19ER5.jpg",
  //   },
  //   {
  //     type: "subject",
  //     question: "Harry Potter or Star Wars?",
  //     a1: "Harry Potter",
  //     a2: "Star Wars",
  //     a1url:
  //       "http://images.unsplash.com/photo-1527684651001-731c474bbb5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MXxzZWFyY2h8Mnx8aGFycnklMjBwb3R0ZXJ8fDB8fHw&ixlib=rb-1.2.1&q=80&w=1080",
  //     a2url:
  //       "https://hdqwalls.com/wallpapers/star-wars-the-rise-of-skywalker-2019-4k-mz.jpg",
  //   },
  //   {
  //     type: "binary",
  //     question:
  //       "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo?",
  //     a1: "Yes",
  //     a2: "No",
  //   },
  //   {
  //     type: "image",
  //     question: "Which image resonates more with you?",
  //     a1url:
  //       "https://images-na.ssl-images-amazon.com/images/I/81K69hobZeL._SL1500_.jpg",
  //     a2url:
  //       "https://ctl.s6img.com/society6/img/IDG_-og9UUn4_CyEeBJhfSTCLrI/w_1500/canvas/~artwork/s6-original-art-uploads/society6/uploads/misc/02a700c2440d43eaacd39ca7176e9ae9/~~/sun-painting-canvas.jpg",
  //   },
  // ];
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [group, setGroup] = useState([]);
  const [screen, setScreen] = useState(0); // 0: start screen, 1: choices screen, 2: results screen
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState("");
  const [uuid, setUuid] = useState(0);
  const [session, setSession] = useState(0);

  const nextQuestion = async (response) => {
    setResponses([...responses, response]);
    if (index < questions.length - 1) {
      // If there are still more questions to be displayed
      setIndex(index + 1);
    } else {
      setScreen(2)
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: [...responses, -1],
        }),
      };

      fetch(
        // Send user response to server
                `https://calgary-hack-2021.uc.r.appspot.com/users/${uuid.uuid}`,
        requestOptions
      ).then(() => {
        (function callback() {
          // While the user has not been matched with a group yet
          fetch(
            `https://calgary-hack-2021.uc.r.appspot.com/users/${uuid.uuid}`,
            )
            .then((response) => response.json())
            .then((data) => {
              if (data["group"] !== null) {
                fetch(
                  `https://calgary-hack-2021.uc.r.appspot.com/groups/${data["group"]}`
                ) // Get group info
                  .then((response) => response.json())
                  .then((data) => {
                    setGroup(data["users"]);
                    setLoading(false);
                  });
              } else {
                setTimeout(callback, 5000);
              }
            });
        }());
      })
    }
  };

  const handleClick = async () => {
    if (username === "" || session === "") {
      alert("Please make sure username and session are entered.");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      };
      fetch(
        // Join session
        `https://calgary-hack-2021.uc.r.appspot.com/sessions/${session}/users`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setUuid(data);
          fetch(
            // Get session questions
            `https://calgary-hack-2021.uc.r.appspot.com/sessions/${session}/questions`
          )
            .then((response) => response.json())
            .then((data) => {
              setQuestions(data);
              setScreen(1);
            });
        })
        .catch(() => {
          alert("Invalid session code!");
        });
    }
  };

  const showModal = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("https://calgary-hack-2021.uc.r.appspot.com/sessions", requestOptions) // Generate session ID
      .then((response) => response.json())
      .then((data) => setSession(data["uuid"]));
    setModal(true);
  };

  const endSession = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "STOPPED" }),
    };
    fetch(
      // End session
      `https://calgary-hack-2021.uc.r.appspot.com/sessions/${session}`,
      requestOptions
    );
    setModal(false);
  };

  // Show the correct screen
  if (screen == 2) {
    return <Connect username={username} loading={loading} group={group} />;
  } else if (screen == 1) {
    return (
      <Choice
        session={session}
        username={username}
        question={questions[index]}
        nextQuestion={nextQuestion}
      />
    );
  } else {
    return (
      <Fade>
        <div className={styles.container}>
          <Head>
            <title>Horizon</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            {modal && (
              <>
                <div className={styles.overlay} />
                <Bounce>
                  <div className={styles.modal}>
                    <h3>Your session ID is:</h3>
                    {/* <CopyToClipboard text={session}
          onCopy={() => setCopied(true)}>
          <span>Copy</span>
        </CopyToClipboard> */}
                    <h1 className={styles.sessionId}>{session}</h1>
                    <button
                      className={styles.createSession}
                      style={{ marginTop: 35 }}
                      onClick={endSession}
                    >
                      End Session
                    </button>
                  </div>
                </Bounce>
              </>
            )}
            <img className={styles.horizon} src="title.png" />
            <div className={styles.search_box}>
              <input
                className={styles.search_bar}
                onChange={(e) => setSession(e.target.value)}
                type="text"
                placeholder="Session Code"
              />
            </div>
            <div className={styles.search_box}>
              <input
                className={styles.search_bar}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />
            </div>
            <button className={styles.button} onClick={handleClick}>
              Join!
            </button>
            <p className={styles.or}>OR</p>
            <button className={styles.createSession} onClick={showModal}>
              Create a Session!
            </button>
          </main>

          <footer className={styles.footer}>
            Built for CalgaryHacks21 by Justin Chu, Sam Prokopchuk, Mark Chen,
            and Connor Ibbotson
          </footer>
        </div>
      </Fade>
    );
  }
}
