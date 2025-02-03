"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import confetti from "canvas-confetti"; // Import confetti from the canvas-confetti package

export default function Home() {
  const [songPlaying, setSongPlaying] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [hearts, setHearts] = useState<string[]>([]); // State to store hearts
  const [currentRow, setCurrentRow] = useState<number>(0); // Keeps track of the current row
  const [heartIndex, setHeartIndex] = useState<number>(0); // Keeps track of the heart position

  const maxHeartsPerRow = 10; // Increased number of hearts per row for longer rows

  const handleYesClick = () => {
    setYesClicked(true);
    setNoButtonPosition({ top: 0, left: 0 });
    const audio = document.getElementById("song") as HTMLAudioElement;
    if (audio) {
      audio.play();
      setSongPlaying(true);
      // Trigger falling confetti animation
      confetti({ particleCount: 150, spread: 70, origin: { x: 0, y: 0 } });   // Top-left
      confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 0 } }); // Top-center
      confetti({ particleCount: 150, spread: 70, origin: { x: 1, y: 0 } });   // Top-right
      confetti({ particleCount: 150, spread: 70, origin: { x: 0, y: 1 } });   // Bottom-left
      confetti({ particleCount: 150, spread: 70, origin: { x: 0.5, y: 1 } }); // Bottom-center
      confetti({ particleCount: 150, spread: 70, origin: { x: 1, y: 1 } });   // Bottom-right
    }

    // Generate hearts one by one
    const heartInterval = setInterval(() => {
      setHeartIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex % maxHeartsPerRow === 0) {
          setCurrentRow((prevRow) => prevRow + 1); // Move to the next row
        }
        return newIndex;
      });

      setHearts((prevHearts) => [...prevHearts, '♥']);
    }, 500); // Add a new heart every 500ms

    setTimeout(() => {
      clearInterval(heartInterval); // Stop after adding 50 hearts
    }, 500 * 50); // Stop the interval after 50 hearts are added
  };

  const handleNoClick = () => {
    if (yesClicked) return;
    // Generate a new position that avoids overlapping with the "Yes" button and keeps away from the heart.
    const newTop = Math.floor(Math.random() * 200) - 100;
    const newLeft = Math.floor(Math.random() * 100); // only positive offsets, max 100px
    setNoButtonPosition({ top: newTop, left: newLeft });
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <h1
          className="text-9xl font-bold mb-4 ml-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Will you be my valentine?
        </h1>
        <p
          className="text-2xl font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {`February 14`}
        </p>
        <div className="flex space-x-4 mb-8 mt-12">
          <button
            className="px-6 py-3 text-3xl font-bold bg-green-500 text-white rounded"
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button
            className="px-6 py-3 text-3xl font-bold bg-red-500 text-white rounded"
            onClick={handleNoClick}
            style={{
              position: "relative",
              top: noButtonPosition.top,
              left: noButtonPosition.left,
              transition: "all 0.3s ease"
            }}
          >
            No
          </button>
        </div>
        {songPlaying && (
          <p
            className="text-2.5xl font-bold mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            now playing lover by taylor swift!
          </p>
        )}
        <audio id="song" src="/lover.mp3" preload="auto" />
        <div className="w-full flex justify-end mt-10">
          <h1
            className="text-9xl font-bold"
            style={{
              fontFamily: "'Inter', sans-serif",
              transform: "scale(4)",
              transformOrigin: "right",
              pointerEvents: "none" // makes the heart unclickable
            }}
          >
            ♥
          </h1>
        </div>
        
      {yesClicked && (
  <div
    className="absolute top-10 right-20" 
    style={{ maxWidth: "250px", maxHeight: "300px" }}
  >
    <p
      className="text-3xl font-bold"
      style={{
        padding: "10px",
        textAlign: "center"
      }}
    >
      "Every moment with you feels like a beautiful song, one I want to play forever"
    </p>
  </div>
)}



        
        {/* Render hearts in grid pattern below the "Will you be my valentines?" text */}
        <div className="flex flex-wrap justify-center mt-16">
          {hearts.map((heart, index) => {
            const row = Math.floor(index / maxHeartsPerRow); // Row number
            const col = index % maxHeartsPerRow; // Column number
            return (
              <span
                key={index}
                className="text-5xl m-1"
                style={{
                  position: "absolute",
                  top: `${row * 40 + 300}px`, // Adjusted to position below the text
                  left: `${col * 50 + 50}px`,
                  animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`,
                }}
              >
                {heart}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
