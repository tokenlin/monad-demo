"use client";

// import Link from "next/link";
import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// import styles from "TugOfWar.css";

// import styles from "~~/styles/TugOfWar.css";‘

import "../styles/globals.css";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  const ropePosition = 0;

  // const ropeStyle = {
  //   left: `${50 + (20 * 5)}%`
  // };

  // const flagStyle = {
  //   left: `calc(${50 + (ropePosition * 2.5)}% - 15px)`  // 调整旗子的位置
  // };
  // const flagStyle = {
  //   // left: `calc(${50 + ropePosition * 2.5}% - 15px)`  // 调整旗子的位置
  //   left: `${ropePosition * 1.5 - 15}px`  // 调整旗子的位置
  // };


  const team1Score = 10;
  const team2Score = 2;

  const pullRope = ()=>{
    // console.log(_bool);
  };


  


  // 计算旗子偏移量
  const flagOffset = ropePosition * 5; // 每单位移动5%

  console.log("Rendering with rope position:", ropePosition, "Flag offset:", flagOffset);

  return (
    <div className="tug-of-war-container">
      <h1 className="tug-of-war-title">Tug of War</h1>
      <div className="tug-of-war-score-board">
        <div className="tug-of-war-team1-score">Team 1 scores: {team1Score}</div>
        <div className="tug-of-war-team2-score">Team 2 scores: {team2Score}</div>
      </div>

      <div className="tug-of-war-field">
        <div className="tug-of-war-team1">Team 1</div>

        <div 
          className="tug-of-war-rope-line"
          style={{"--flag-offset": `${flagOffset}%`}}
        >
          <div className="tug-of-war-rope-center"></div>
          <div className="tug-of-war-flag">
            <div className="tug-of-war-flag-triangle"></div>
            
          </div>
        </div>
        <div className="tug-of-war-team2">Team 2</div>
      </div>

      <div className="tug-of-war-controls">
        <button className="tug-of-war-pull-button" onClick={() => pullRope()}>Cheer for Team 1</button>
        <button className="tug-of-war-pull-button" onClick={() => pullRope()}>Cheer for Team 2</button>
      </div>
    </div>
  );





};

export default Home;