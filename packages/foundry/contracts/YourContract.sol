// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    int public ropePosition;
    uint public team1Score;
    uint public team2Score;
    
    event RopePositionChanged(int newPosition);
    event ScoreUpdated(uint team1Score, uint team2Score);

    constructor(address _owner) {
      // owner = _owner;
    }

    function pull(bool isTeam1) public {
        if (isTeam1) {
            ropePosition--;
        } else {
            ropePosition++;
        }
        
        emit RopePositionChanged(ropePosition);
        
        if (ropePosition <= -10) {
            team1Score++;
            resetGame();
        } else if (ropePosition >= 10) {
            team2Score++;
            resetGame();
        }
        
        emit ScoreUpdated(team1Score, team2Score);
    }
    
    function resetGame() private {
        ropePosition = 0;
    }
}