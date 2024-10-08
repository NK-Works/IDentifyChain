import React, { useState, useEffect } from "react";
import styles from "./ChatBot.module.css";

const data = {
  chatinit: {
    title: [
      "Hello <span class='emoji'> &#128075;</span>",
      "I am Mr. Vbot",
      "Welcome to IDentifyChain",
      "How can I help you?",
    ],
    options: [
      "Voting",
      "Candidate",
      "About_IDentifyChain",
      "Feedback",
      "Helpline",
    ],
  },
  voting: {
    title: ["Please select category"],
    options: ["Create", "Update", "Is_verified", "Others"],
    url: {},
  },
  about_IDentifyChain: {
    title: ["About_IDentifyChain"],
    options: [
      "Our IDentifyChain voting system ensures that each vote is securely encrypted and stored on an immutable ledger, preventing tampering and guaranteeing the integrity of the election results.",
      "The transparent nature allows for real-time auditing and verification of votes by anyone, ensuring a fair and open voting process.",
      "Voters' identities are kept anonymous, maintaining privacy while allowing them to cast their votes from anywhere with internet access, making the system both secure and convenient.",
    ],
    url: {
      more: "#",
      link: ["#", "#", "#", "#"],
    },
  },
  candidate: {
    title: ["Please select the given option."],
    options: ["update", "create", "Is_verified", "Others"],
    url: {},
  },
  feedback: {
    title: [
      "Please email your feedback to dchain@gmail.com.",
      "Refresh the button for other queries",
    ],
    options: [],
  },
  create: {
    title: [
      "Please connect your account using MetaMask. You can find the connect button at the top right corner of the page. After connecting, locate the Voter button at the top right, click it, and fill in your information to create an account.",
    ],
    options: ["Hope this helped you!"],
    url: {
      more: "#",
      link: ["#", "#", "#", "#", "#"],
    },
  },
  update: {
    title: [
      "To update your profile, open your profile page. At the bottom, you will find a button to change your information.",
      "Refresh the button for other queries",
    ],
    options: [],
  },
  is_verified: {
    title: [
      "Account verification: After filling in all your information with the required valid proofs for voting, your account will be verified. You can later update your profile as needed.",
      "Post vote verification: You will receive a verified sticker after casting your vote.",
      "Refresh the button for other queries",
    ],
    options: [],
  },
  others: {
    title: [
      "Connect to our member",
      "call 9876543210",
      "or",
      "Mail to dchain@gmail.com",
    ],
    options: [],
  },
  helpline: {
    title: ["Please connect to our assistant 9876543210"],
    options: ["Have a great day!"],
    url: {
      more: "#",
      link: ["#", "#", "#", "#", "#"],
    },
  },
};

function ChatBot() {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [options, setOptions] = useState([]);
  const [len1] = useState(data.chatinit.title.length);

  useEffect(() => {
    if (chatVisible) {
      initChat();
    }
  }, [chatVisible]);

  const showChatBot = () => {
    setChatVisible(!chatVisible);
  };

  const initChat = () => {
    let j = 0;
    setMessages([]);
    for (let i = 0; i < len1; i++) {
      setTimeout(() => handleChat(j++), i * 500);
    }
    setTimeout(() => {
      showOptions(data.chatinit.options);
    }, (len1 + 1) * 500);
  };

  const handleChat = (index) => {
    setMessages((prev) => [
      ...prev,
      { text: data.chatinit.title[index], class: styles.msg },
    ]);
    handleScroll();
  };

  const showOptions = (options) => {
    setOptions(options);
    handleScroll();
  };

  const handleOpt = (opt) => {
    const str = opt.target.innerText;
    const textArr = str.split(" ");
    const findText = textArr[0].toLowerCase();

    console.log("findText:", findText); // Log findText
    console.log("data keys:", Object.keys(data)); // Log data keys

    setOptions([]);
    setMessages((prev) => [
      ...prev,
      { text: str, class: `${styles.test} ${styles.rep}` },
    ]);

    const tempObj = data[findText];

    if (!tempObj) {
      console.error(`Key "${findText}" not found in data object.`);
      return;
    }

    handleResults(tempObj.title, tempObj.options, tempObj.url);
  };

  const handleResults = (title, options, url) => {
    for (let i = 0; i < title.length; i++) {
      setTimeout(() => handleDelay(title[i]), i * 500);
    }

    const isObjectEmpty = (url) => {
      return JSON.stringify(url) === "{}";
    };

    if (isObjectEmpty(url)) {
      setTimeout(() => showOptions(options), title.length * 500);
    } else {
      setTimeout(() => handleOptions(options, url), title.length * 500);
    }
  };

  const handleDelay = (title) => {
    setMessages((prev) => [...prev, { text: title, class: styles.msg }]);
  };

  const handleOptions = (options, url) => {
    if (!Array.isArray(options)) {
      console.error("Options is not an array:", options);
      return;
    }

    const optionsElements = options.map((opt, i) => (
      <span className={styles.opt} key={i}>
        <a className={styles.mLink} href={url.link && url.link[i]}>
          {opt}
        </a>
      </span>
    ));
    if (url && url.more) {
      optionsElements.push(
        <span className={`${styles.opt} ${styles.link}`} key="more">
          <a className={styles.mLink} href={url.more}>
            See more
          </a>
        </span>
      );
    }
    setOptions(optionsElements);
    handleScroll();
  };

  const handleScroll = () => {
    const elem = document.getElementById("chat-box");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  };

  return (
    <>
      <img
        src="/assets/images/chatbot.png"
        alt="AI Profile"
        className={styles.profileButton}
        onClick={showChatBot}
      />
      {chatVisible && (
        <div id="test" className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <img
              src="/assets/images/chatbot.png"
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.chatHeaderText}>
              <span className={styles.chatBotName}>Mr. Vbot</span>
              <span className={styles.onlineStatus}>Online</span>
            </div>
          </div>
          <div id="chat-box" className={styles.chatBox}>
            {messages.map((msg, i) => (
              <p
                key={i}
                className={msg.class}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            {options.map((opt, i) => (
              <span key={i} className={styles.opt} onClick={handleOpt}>
                <div>{opt}</div>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
