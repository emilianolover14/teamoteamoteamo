import React, { useState, useEffect } from "react";

export default function App() {
  const [message, setMessage] = useState(
    "Hola amor, ¿queres ser mi San Valentín? 💖"
  );
  const [items, setItems] = useState([]);
  const audioSrc =
    "https://docs.google.com/uc?export=download&id=1j66Zs1k1A7rJ3L3FNRLeTOACsTFKrC5x"; // 🎶 Misty - Sarah Vaughan

  const handleNoClick = () => {
    const randomMessages = [
      "¿Lo de ayer no significó nada? 🥺",
      "molly no querría esto 😔",
      "DALEEEEEEEE ",
      "bueno te dejo pensarlo bien 🤔",
      "dale si me re amas 🥰",
      "te haces la difícil encima 🙄",
      "nunca más te compro un durazno delicioso 🍑",
      "listo ya me re calenté 😡",
    ];
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    setMessage(randomMessages[randomIndex]);
  };

  const handleYesClick = () => {
    setMessage(
      "¡SIIII! Sabía que ibas a querer, mi amor. Te amo con todo mi ser ❤️ Nos vemos mañana a la noche, pensa en una buena peli y ponete linda (como siempre estás) 😍"
    );

    // Agregar muchos más emojis con mayor velocidad 🚀
    const newItems = Array.from({ length: 40 }).map(() => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() > 0.5 ? 2 : -2) * Math.random(), // MÁS RÁPIDO
      dy: (Math.random() > 0.5 ? 2 : -2) * Math.random(), // MÁS RÁPIDO
      symbol: ["❤️", "💐", "🍑", "🍔"][Math.floor(Math.random() * 4)],
    }));
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  useEffect(() => {
    // Crear emojis iniciales
    const initialItems = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: Math.random() > 0.5 ? 0.5 : -0.5,
      dy: Math.random() > 0.5 ? 0.5 : -0.5,
      symbol: ["❤️", "💐", "🍑", "🍔"][Math.floor(Math.random() * 4)],
    }));
    setItems(initialItems);

    // Animación de movimiento
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          let newX = item.x + item.dx;
          let newY = item.y + item.dy;
          let newDx = item.dx;
          let newDy = item.dy;

          if (newX <= 0 || newX >= window.innerWidth - 30) newDx *= -1;
          if (newY <= 0 || newY >= window.innerHeight - 30) newDy *= -1;

          return { ...item, x: newX, y: newY, dx: newDx, dy: newDy };
        })
      );
    }, 20); // MÁS RÁPIDO

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{message}</h1>
      <div>
        <button onClick={handleYesClick} style={styles.button}>
          Sí
        </button>
        <button onClick={handleNoClick} style={styles.button}>
          No
        </button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.item,
            left: item.x,
            top: item.y,
          }}
        >
          {item.symbol}
        </div>
      ))}

      {/* 🎵 Agregar música de fondo */}
      <audio autoPlay loop>
        <source src={audioSrc} type="audio/mp3" />
      </audio>
    </div>
  );
}

// 🎨 Estilos en línea
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#ffe6eb",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    padding: "20px",
  },
  title: {
    color: "#f07e99",
    fontSize: "28px",
  },
  button: {
    backgroundColor: "#f07e99",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "18px",
    borderRadius: "10px",
  },
  item: {
    position: "absolute",
    fontSize: "40px",
    transition: "top 0.02s linear, left 0.02s linear",
  },
};
