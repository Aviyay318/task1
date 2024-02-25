import React from "react";
import './Board.css';

function GameBoard(props){
    const board = props.board;

    function painWinner(row,col){
        const tempBoard = board;
        tempBoard[row][col].color="green";
    }

  return(
      <div className={"masterDiv"}>
          <div className={"secondDiv"}>
              <button className={"undo"} disabled={props.played===false}  onClick={()=>props.undo()}>Undo</button>
              <div>Winner: {props.winner.player}</div>
              <div>
                  {
                      props.winRPos.length>=4&&
                      props.winRPos.map((item)=>{
                          return(
                              <span>
                                  {item.row} - {item.col}  <br/></span>

                          )
                      })
                  }
                  {props.winCPos.length>=4&&
                      props.winCPos.map((item)=>{
                          return(
                              <span>
                                {item.row} - {item.col}
                              </span>
                          )
                      })
                  }
              </div>
          </div>
          <div className={"firstDiv"}>
          {
              <div>
                  {board.map((row, rowIndex) => (
                      <div key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                              <div className={"square"}>
                                  <span style={{background:cell.color }} onClick={()=>{props.setColor(cellIndex)}} className={"circle"}  key={cellIndex}></span>
                              </div>

                          ))}
                      </div>
                  ))}
              </div>
          }
          </div>

      </div>
  )
}
export default GameBoard;