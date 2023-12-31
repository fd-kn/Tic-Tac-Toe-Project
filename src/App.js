import { useState } from "react";


function App() {

  const [turn, setTurn] = useState('x')
  const [cell, setCell] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState()

  const checkWinner = (squares) => {
    let combos = {
      across : [
        [0,1,2],
        [3,4,5],
        [6,7,8]
      ],
      down: [
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ],
      diagnol: [
        [0,4,8],
        [2,4,6]
      ]
    }

    for(let combo in combos){
      combos[combo].forEach((pattern) => {
        if(
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === '' 
        ){
          // do nothing
        } else if ( 
            squares[pattern[0]] === squares[pattern[1]] && 
            squares[pattern[1]] === squares[pattern[2]] 
          ) {
            setWinner(squares[pattern[1]])
        }
      });
    }

  }

  const Cell = ({ num }) => {
    return(<td onClick={() => handleClick(num)}>{cell[num]}</td>)
  }

  const handleClick = (num) => {
    if(cell[num] !== ''){
      alert('already taken')
      return;
    }
    let squares = [...cell]
    if(turn === 'x'){
      squares[num] = 'x'
      setTurn('o')
    } else {
      squares[num] = 'o'
      setTurn('x')
  }

   checkWinner(squares) 
   setCell(squares)  
  }

  const restart = () => {
    if ( winner==='o' || winner ==='x'){
      setCell(Array(9).fill(''))
      setWinner()
    }
  }

  return (
    <div className="App">
      <table className="table">
        <tr>
          <Cell num={0}/>
          <Cell num={1}/>
          <Cell num={2}/>
        </tr>
        <tr>
          <Cell num={3}/>
          <Cell num={4}/>   
          <Cell num={5}/> 
        </tr>
        <tr>
          <Cell num={6}/>
          <Cell num={7}/>
          <Cell num={8}/> 
        </tr>
      </table>
      {winner && (
        <>
        <p>The winner is {winner}</p>
        <button onClick={restart}>Play again</button>
        </>
      )}
    </div>
  );

}

export default App;
