"use client"


import type { NextPage } from "next"

import "../styles/globals.css"
import {useWaitForTransactionReceipt, type BaseError} from "wagmi"

import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth"


const Home: NextPage = () => {
 

  const ropePosition = 0

  const team1Score = 0
  const team2Score = 0

  const { data: ropePositionOnChain } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'ropePosition',
    args: [],
  })

  const { data: maxScoreDifferenceOnChain } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'maxScoreDifference',
    args: [],
  })

  const { data: team1ScoreOnChain } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'team1Score',
    args: [],
  })

  const { data: team2ScoreOnChain } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'team2Score',
    args: [],
  })


  const { data: winStatusOnChain } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'getWinStatus',
    args: [],
  })


  const {
    data: hash,
    error,
    isPending,
    writeContract
  } = useScaffoldWriteContract("YourContract")

  const pullRope = (isTeam1: boolean) => {
    writeContract({
      functionName: "pull",
      args: [isTeam1],
    })
    console.log("hash:", hash)
    // console.log(_bool);
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })




  // 计算旗子偏移量
  const flagOffset = (ropePositionOnChain ? Number(ropePositionOnChain)*40/Number(maxScoreDifferenceOnChain) : ropePosition) * 5 // 每单位移动5%

  console.log("Rendering with rope position:", ropePosition, "Flag offset:", flagOffset)

  return (
    <div className="tug-of-war-container">
      <h1 className="tug-of-war-title">Tug of War</h1>
      <div className="tug-of-war-score-board">
        <div className="tug-of-war-team1-score">Team 1 scores: {team1ScoreOnChain ? Number(team1ScoreOnChain) : team1Score}</div>
        <div className="tug-of-war-team2-score">Team 2 scores: {team2ScoreOnChain ? Number(team2ScoreOnChain) : team2Score}</div>
      </div>


      {(winStatusOnChain == 1) && <h1 className="tug-of-war-title">Team 1 Win</h1>}
      {(winStatusOnChain == 2) && <h1 className="tug-of-war-title">Team 2 Win</h1>}

      <div className="tug-of-war-field">
        <div className="tug-of-war-team1">Team 1</div>

        <div
          className="tug-of-war-rope-line"
          style={{ "--flag-offset": `${flagOffset}%` }}
        >
          <div className="tug-of-war-rope-center"></div>
          <div className="tug-of-war-flag">
            <div className="tug-of-war-flag-triangle"></div>

          </div>
        </div>
        <div className="tug-of-war-team2">Team 2</div>
      </div>

      <div className="tug-of-war-controls">
        <button className="tug-of-war-pull-button" onClick={() => pullRope(true)}>Cheer for Team 1</button>
        <button className="tug-of-war-pull-button" onClick={() => pullRope(false)}>Cheer for Team 2</button>
      </div>
      <div className="m-4">
        <p>[OnChain] ropePosition: {Number(ropePositionOnChain)},
          team1Score: {Number(team1ScoreOnChain)},
          team2Score: {Number(team2ScoreOnChain)},
        </p>
        {isPending && 'Confirming...'}
        {hash && <div>Transaction Hash:
          <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank">{hash}</a>
        </div>
        }
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}

      </div>
    </div>
  )


}

export default Home