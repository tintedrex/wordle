// import React from "react";
// import { useState } from "react";
// import { useEffect } from 'react';
// import './App.css';

// const solutions = ['apple', 'grape', 'lemon', 'melon', 'peach'];



// const useWordle = (solution) => {
//   const [turn, setTurn] = useState(0) 
//   const [currentGuess, setCurrentGuess] = useState('')
//   const [guesses, setGuesses] = useState([]) // each guess is an array
//   const [history, setHistory] = useState([]) // each guess is a string
//   const [isCorrect, setIsCorrect] = useState(false)

//   // format a guess into an array of letter objects 
//   // e.g. [{key: 'a', color: 'yellow'}]
//   const formatGuess = () => {
    
//   }

//   // add a new guess to the guesses state
//   // update the isCorrect state if the guess is correct
//   // add one to the turn state
//   const addNewGuess = () => {

//   }

//   // handle keyup event & track current guess
//   // if user presses enter, add the new guess
//   const handleKeyup = () => {

//   }

//   return {turn, currentGuess, guesses, isCorrect, handleKeyup}
// }

// // export default useWordle

// // export default function Wordle({ solution }) {
// //   const { currentGuess, handleKeyup } = useWordle(solution)

// //   useEffect(() => {
// //     window.addEventListener('keyup', handleKeyup)

// //     return () => window.removeEventListener('keyup', handleKeyup)
// //   }, [handleKeyup])

// //   return (
// //     <div>
// //       <div>Current Guess - {currentGuess}</div>
// //     </div>
// //   )
// // }

// function App() {
//   const [solution, setSolution] = useState(null)

//   useEffect(() => {
//         const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
//         setSolution(randomSolution.word)
//   }, [setSolution])

//   return (
//     <div className="App">
//       <h1>Wordle (Lingo)</h1>
//       {solution && <Wordle solution={solution} />}
//     </div>
// )
// }
// export default App;











import React, { useState, useEffect } from "react";
import './App.css';

const solutions = ['cat', 'dog', 'fox', 'bat', 'cow'];

function App() {
  const [solution, setSolution] = useState(null);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
    setSolution(randomSolution);
  }, []);

  const handleKeyup = (e) => {
    if (e.key === 'Enter') {
      if (currentGuess.length === 3) {
        addNewGuess();
        setCurrentGuess(currentGuess.slice(0, -3));
      }
  }
     else if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -3));
    }
    else if (/[a-zA-Z]/.test(e.key) && currentGuess.length < 3) {
    setCurrentGuess(currentGuess + e.key.toLowerCase());
    }
  };

  const addNewGuess = () => {
    const guess = currentGuess;
    setGuesses([...guesses, guess]);

    if (guess === solution) {
      setIsCorrect(true);
    }

    
  };

  const getColor = (guessLetter, index) => {
    if (!solution) return 'white';

    if (guessLetter === solution[index]) {
      return 'lightgreen';
    }
    if (solution.includes(guessLetter)) {
      return 'yellow';
    }
    return 'lightgrey';
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [currentGuess]);

  return (
    <div className="App">
      {isCorrect && <h2>Success!</h2>}
      <div>
        {guesses.map((guess) => (
          <div>
            {guess.split('').map((letter, i) => (
              <span key={i} style={{backgroundColor : getColor(letter, i)}}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {!isCorrect && (
        <div>
        <p>Guess the Animal</p>
          <div>Word ? : {currentGuess}</div>
        </div>
      )}
    </div>
  );
}

export default App;













// import React, { useState, useEffect } from "react";
// import './App.css';

// const solutions = ['apple', 'grape', 'lemon', 'melon', 'peach'];

// const useWordle = (solution) => {
//   const [turn, setTurn] = useState(0);
//   const [currentGuess, setCurrentGuess] = useState('');
//   const [guesses, setGuesses] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [isCorrect, setIsCorrect] = useState(false);

//   const formatGuess = (guess) => {
//     return guess.split('').map(letter => ({
//       key: letter,
//       color: 'black'
//     }));
//   }

//   const addNewGuess = () => {
//     if (currentGuess === solution) {
//       setIsCorrect(true);
//     }
//     setGuesses([...guesses, formatGuess(currentGuess)]);
//     setHistory([...history, currentGuess]);
//     setTurn(turn + 1);
//     setCurrentGuess('');
//   }

//   const handleKeyup = (e) => {
//     if (e.key === 'Enter') {
//       if (currentGuess.length === 5) {
//         addNewGuess();
//       }
//     } else if (e.key === 'Backspace') {
//       setCurrentGuess(currentGuess.slice(0, -1));
//     } else if (/[a-zA-Z]/.test(e.key) && currentGuess.length < 5) {
//       setCurrentGuess(currentGuess + e.key.toLowerCase());
//     }
//   }

//   return { turn, currentGuess, guesses, isCorrect, handleKeyup };
// }

// function Wordle({ solution }) {
//   const { turn, currentGuess, guesses, isCorrect, handleKeyup } = useWordle(solution);

//   useEffect(() => {
//     window.addEventListener('keyup', handleKeyup);

//     return () => {
//       window.removeEventListener('keyup', handleKeyup);
//     }
//   }, [handleKeyup]);

//   return (
//     <div>
//       <div>Current Guess - {currentGuess}</div>
//       <div>Turn: {turn}</div>
//       {guesses.map((guess, index) => (
//         <div key={index}>
//           {guess.map((letterObj, idx) => (
//             <span key={idx} style={{ color: letterObj.color }}>
//               {letterObj.key}
//             </span>
//           ))}
//         </div>
//       ))}
//       {isCorrect && <div>Congratulations! You've guessed the word!</div>}
//     </div>
//   );
// }

// function App() {
//   const [solution, setSolution] = useState(null);

//   useEffect(() => {
//     const randomSolution = solutions[Math.floor(Math.random() * solutions.length)];
//     setSolution(randomSolution);
//   }, []);

//   return (
//     <div className="App">
      
//       {solution && <Wordle solution={solution} />}
    
//     </div>
//   );
// }

// export default App;

























// import random
// word = random.choice(words)



// function board() {
//   return (
//     <div>
//       {board.map((row, index) => (
//         <Row key = {index} row = {row} />
//       ))}
//     </div>
//   );
// }

// function input() {
//   return (
//     <input
//     type='text'
//     value={input}
//     onChange={(e) => setinput(e.target.value)}
//     />
//   );
// }


// function App() {
//   const [solution, setSolution] = useState(null)

//   useEffect(() => {
//         const randomSolution = json[Math.floor(Math.random() * json.length)]
//         setSolution(randomSolution.word)
//       }, [setSolution])




//   return (
//     <div className="App">
//       <h1>WORDLE</h1>
//     </div>
//   );
// }



// function WordleClone() {
//   const [wordList, setWordList] = useState([]);
//   const [gameBoard, setGameBoard] = useState([]);
//   const [userInput, setUserInput] = useState('');
  
// }


// function Wordle() {
//   const [wordList, setWordList] = useState([]);
//   const [solutionWord, setSolutionWord] = useState("");
//   const [gameBoard, setGameBoard] = useState([]);
//   const [userInput, setUserInput] = useState("");

  // useEffect(() => {
  //   const newSolutionWord =
  //     wordList[Math.floor(Math.random() * wordList.length)];
  //   setSolutionWord(newSolutionWord);
  // }, [wordList]);

  // const handleGuess = () => {
 
  // };

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleGuess();
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={userInput}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//       />
//       <GameBoard gameBoard={gameBoard} />
//     </div>
//   );
// }



// export default App;




