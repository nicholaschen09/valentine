"use client";
import { useState } from "react";
import Head from "next/head";
import confetti from "canvas-confetti"; // Import confetti from the canvas-confetti package

export default function Home() {
  const [songPlaying, setSongPlaying] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });

  const handleYesClick = () => {
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
  };

 const handleNoClick = () => {
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
          Will you be my valentines?
        </h1>
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
      </div>
    </>
  );
}