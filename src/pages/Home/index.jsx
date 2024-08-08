import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

function Home() {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    job: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);
  const jobRef = useRef(null);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(storedCards);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (nameRef.current.value.length < 3) {
      alert("Ism xato");
      nameRef.current.style.outlineColor = "red";
      nameRef.current.focus();
      return false;
    }
    if (!emailRef.current.value.includes("@")) {
      alert("Email xato");
      emailRef.current.style.outlineColor = "red";
      emailRef.current.focus();
      return false;
    }
    if (ageRef.current.value <= 0) {
      alert("Yosh xato");
      ageRef.current.style.outlineColor = "red";
      ageRef.current.focus();
      return false;
    }
    if (jobRef.current.value.length < 3) {
      alert("Ish xato");
      jobRef.current.style.outlineColor = "red";
      jobRef.current.focus();
      return false;
    }
    return true;
  };

  const handleAddCard = () => {
    if (!validate()) return;

    const newCard = { ...formData };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setFormData({
      name: "",
      surname: "",
      age: "",
      email: "",
      job: "",
    });
  };

  const handleDeleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <div className={styles.home}>
      <h1>Welcome Home Page</h1>

      <div className={styles.formContainer}>
        <h4>Malumotingizni kriting</h4>
        <input
          type="text"
          name="name"
          value={formData.name}
          ref={nameRef}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Surname"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          ref={ageRef}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          ref={emailRef}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="job"
          value={formData.job}
          ref={jobRef}
          onChange={handleChange}
          placeholder="Job"
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>

      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.info}>
              <h2>Name:</h2>
              <p>{card.name}</p>
            </div>
            <div className={styles.info}>
              <h2>Surname:</h2>
              <p>{card.surname}</p>
            </div>
            <div className={styles.info}>
              <h2>Age:</h2>
              <p>{card.age}</p>
            </div>
            <div className={styles.info}>
              <h2>Email:</h2>
              <p>{card.email}</p>
            </div>
            <div className={styles.info}>
              <h2>Job:</h2>
              <p>{card.job}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteCard(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
