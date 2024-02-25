import React from "react";
import GameBoard from "./GameBoard";
import moving from "./Moving";

class Game extends React.Component{
    state ={
        player1:{name:"Aviya",color:"red",chip:0},
        player2:{name:"Ram",color:"yellow",chip:0},
        column:8,
        row:6,
        board:[],
        startGame:false,
        indexBoard:[],
        turn:true,
        lastMove:{},
        played:false,
        winner:{win:false,player:""},
        winRowPosition:[],
        winColPosition:[],
        countdown:5


    }
    componentDidMount() {
        this.setMatrixBoard();
        this.setIndexBoard();
        this.startCountdown();
    }
    setIndexBoard=()=>{
        const tempArray = [];
        for (let i=0;i<this.state.column;i++){
            tempArray[i]=this.state.row-1;
        }
        this.setState({indexBoard:tempArray})
    }

    setMatrixBoard=()=>{
        const tempBoard = [];
        for (let i =0;i<this.state.row;i++){
            const rowArray = []
            for (let j = 0;j<this.state.column;j++){
                rowArray.push({color:"white",painted:false})
            }
            tempBoard.push(rowArray);
        }
        this.setState({board:tempBoard})
    }
    startGame=()=>{
        this.setState({startGame:true})
    }

    setColor=(col)=>{
           let last = this.state.lastMove;
           let howTurn = this.state.turn;
           const tempBoard = this.state.board;
           const tempArray = this.state.indexBoard;
           const temp = tempBoard[this.state.indexBoard[col]][col];
           if(temp.painted===false){
               howTurn? temp.color=this.state.player1.color:temp.color=this.state.player2.color;
               howTurn? howTurn=false:howTurn=true;
               temp.painted= true;
               last.row=this.state.indexBoard[col];
               last.col=col;
               tempArray[col]>0&&tempArray[col]--;
               this.setState({played:true})
           }
       this.checkWinner();
           if (this.state.winner.win){
               this.setMatrixBoard()
           }
           this.setState({board:tempBoard,indexBoard:tempArray,turn:howTurn,lastMove:last})
    }
    counDown=()=>{
        alert("jkjk")
    }
    undo=()=>{
        if (this.state.played){
            const tempBoard = this.state.board;
            let howTurn = this.state.turn;
            const tempArray = this.state.indexBoard;
            const temp = tempBoard[this.state.lastMove.row][this.state.lastMove.col];
             tempArray[this.state.lastMove.col]++;
            temp.color="white";
            temp.painted=false;
            howTurn? howTurn=false:howTurn=true;
            this.setState({board:tempBoard,indexBoard:tempArray,turn:howTurn,played:false})
        }

    }
   checkWinner=()=>{
                this.checkRow();
                  this.state.winner.win===false&& this.checkCol();
                  this.state.winner.win===false&&this.checkDiagonalsForWin()


    }
    checkDiagonalsForWin = () => {
        const { row, column, board, player1, player2 } = this.state;

        // Check left diagonal
        for (let i = 0; i < row - 3; i++) {
            for (let j = 0; j < column - 3; j++) {
                const color = board[i][j].color;
                if (color !== 'white' &&
                    color === board[i + 1][j + 1].color &&
                    color === board[i + 2][j + 2].color &&
                    color === board[i + 3][j + 3].color) {
                    const winner = color === player1.color ? player1.name : player2.name;
                    this.setMatrixBoard()
                    alert(`Win by Left Diagonal! Player ${winner}`);

                }
            }
        }

        // Check right diagonal
        for (let i = 0; i < row - 3; i++) {
            for (let j = column - 1; j >= 3; j--) {
                const color = board[i][j].color;
                if (color !== 'white' &&
                    color === board[i + 1][j - 1].color &&
                    color === board[i + 2][j - 2].color &&
                    color === board[i + 3][j - 3].color) {
                    const winner = color === player1.color ? player1.name : player2.name;
                    this.setMatrixBoard()
                    alert(`Win by Right Diagonal! Player ${winner}`);

                }
            }
        }


    }

    startCountdown() {
        this.countdownTimer = setTimeout(() => {
            if (this.state.countdown > 0) {
                this.setState(prevState => ({
                    countdown: prevState.countdown - 0.5
                }), this.startCountdown);
            }
        }, 1000);
    }
    // checkMainDiagonal=()=>{
    //     let counter=1;
    //     let winner=""
    //     let color="white";
    //     for (let i=0;i<this.state.row-1;i++){
    //         if (this.state.board[i][i].color!=="white"){
    //             if (this.state.board[i][i].color===this.state.board[i+1][i+1].color){
    //                 counter++;
    //             }else{
    //                 counter=1;
    //             }
    //         }
    //         if (counter===4){
    //             alert("win");
    //             color=this.state.board[i][i].color;
    //             color===this.state.player1.color?winner=this.state.player1.name:winner=this.state.player2.name;
    //             this.setState({winner:{win:true,player:winner}})
    //
    //         }
    //     }
    // }
    checkCol=()=>{
        let counter=1;
        let winner=""
        let color="white";
        let tempWinPosition=this.state.winColPosition;
        const col=this.state.lastMove.col;
        for (let i=0;i<this.state.row-1;i++) {
            if (this.state.board[i][col].color!=="white")
            {
                if (this.state.board[i][col].color===this.state.board[i+1][col].color) {
                    counter++;
                    tempWinPosition.push({row:i,col:col})
                }else {
                    counter=1;
                    tempWinPosition = [];
                    this.setState({winColPosition:tempWinPosition})

                }
            }
            if (counter===4){
                color=this.state.board[this.state.lastMove.col][i].color;
                alert(color)
                color===this.state.player1.color?winner=this.state.player1.name:winner=this.state.player2.name;
                this.setState({winner:{win:true,player:winner}})
                tempWinPosition.push({row:i+1,col:col})
                this.setState({winColPosition:tempWinPosition})
                break;
            }
    }}
 checkRow=()=>{
        let counter=1;
        let winner=""
     let color="white";
        let tempWinPosition=this.state.winRowPosition;
        const row=this.state.lastMove.row;
        for (let i=0;i<this.state.column-1;i++) {
            if (this.state.board[row][i].color!=="white")
            {
           if (this.state.board[row][i].color===this.state.board[row][i+1].color) {
               counter++;
               tempWinPosition.push({row:row,col:i})
           }else {
               counter=1;
               tempWinPosition = [];
               this.setState({winRowPosition:tempWinPosition})

           }}
           if (counter===4){
               color=this.state.board[this.state.lastMove.row][i].color;
               alert(color)
               color===this.state.player1.color?winner=this.state.player1.name:winner=this.state.player2.name;
               this.setState({winner:{win:true,player:winner}})
               tempWinPosition.push({row:row,col:i+1})

               this.setState({winRowPosition:tempWinPosition})
               break;
           }
        }

    }
    render() {
        return(
            <div>
                {
                    this.state.startGame ? <div style={{margin:-20}}>
                        <h2>4 In A Row! turn: <span style={{color:this.state.turn?this.state.player1.color:this.state.player2.color}}>
                            {this.state.turn?this.state.player1.name:this.state.player2.name}</span> </h2>
                        <GameBoard board={this.state.board} square={this.state.square}
                                   setColor={this.setColor} undo={this.undo} played={this.state.played} winner={this.state.winner}
                        winRPos={this.state.winRowPosition} winCPos={this.state.winColPosition} /></div> :<div>
                        <label>Player1 <br/> Enter Your Name: </label><br/>
                        <input value={this.state.player1.name} /><br/>
                        <button style={{display:this.state.startGame!==false&& "none"}} onClick={this.startGame}>Start Game</button>
                    </div>
                }
                <h1>Countdown: {this.state.countdown}</h1>

                <button onClick={this.counDown}>clicked</button>
            </div>
        )
    }

}
export default Game;