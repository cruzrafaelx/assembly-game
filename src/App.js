import './App.css';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { languages } from './languages';
import { getFarewellText, getRandomWord } from './utils';
import { useWindowSize } from 'react-use'
import Confetti from "react-confetti";

function App() {


  //State Values
  const [currentWord, setCurrentWord] = useState(()=> getRandomWord())
  const [chosenLetter, setChosenLetter] = useState([])
  const [correctLetter, setCorrectLetter] = useState([])
  
  console.log(currentWord)

  //Derived Values
  const wrongGuessCount = chosenLetter.filter(l => 
    !currentWord.includes(l.toLowerCase())).length
  const isGameWon = currentWord.split("").every(letter => chosenLetter.includes(letter))
  const isGameLost = wrongGuessCount === languages.length
  const isGameOver = isGameWon || isGameLost
  const previousLetter = chosenLetter[chosenLetter.length-1]
  const isPreviousLetterCorrect = currentWord.includes(chosenLetter[chosenLetter.length-1])
  const numGuessesLeft = languages.length - wrongGuessCount
  

  //Static Values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const {height, width} = useWindowSize()

  const languageList = languages.map((lang, i) => {
    
    const styles = {
      backgroundColor: `${lang.backgroundColor}`,
      color: `${lang.color}`,
  }

    const isLanguageLost = i < wrongGuessCount
    const className = clsx("chip", isLanguageLost && "lost")

    return <span className={className}
            style={styles}
            name={lang.name} 
            key={lang.name}>
            {lang.name}
          </span>   
  })

  
  const lettersList = currentWord.split("").map((letter, index) => {

    const lowercaseLetter = letter.toLowerCase()
    const rightLetter = correctLetter.includes(letter)
      
    if(isGameLost){
      return <span className={correctLetter.includes(letter) ? "visible" : "unguessed"}    
            key={index}>{letter.toUpperCase()}</span>    
    }

    else{
      return <span className={rightLetter ? "visible" : undefined}    
             key={index}>{letter.toUpperCase()}</span>
    }  
  })



  const alphabetList = alphabet.split("").map(letter => (
    <button 
      onClick={()=> {handleChosenLetter(letter); checkLetter(letter)}}
      aria-disabled={chosenLetter.includes(letter)}
      aria-label={`Letter ${letter}`}
      //clsx dynamically setting the class depending whether letter is wrong or right.
      className={clsx(
        'btn',
        correctLetter.includes(letter) === true && 'correct-letter',
        (chosenLetter.includes(letter) &&
        correctLetter.includes(letter) === false) && 'wrong-letter'
      )}
      key={letter}
    >{letter.toUpperCase()}</button>
  ))

  //Functions
  
  //This function adds the clicked letter to the chosenLetter state
  function handleChosenLetter(letter){
    setChosenLetter(prevChosenLetter => {
      
      return prevChosenLetter.includes(letter) ? prevChosenLetter : [...prevChosenLetter, letter] 

      })
  
      //You can also use Sets to solve this
      // const lettersSet = new Set(prevLetters)
      // lettersSet.add(letter)
      // return Array.from(lettersSet)
  }

  //This function checks if the clicked letter is included in the current word, if yes, it gets added to the correct letter state. 
  function checkLetter(letter){
    const result = currentWord.includes(letter)

    setCorrectLetter(prevCorrectLetter => {
      return result ? 
      [...prevCorrectLetter, letter] :
      prevCorrectLetter
    })
  }

  //This function renders the game status
  function renderGameStatus(){

    if(isGameWon){
      return(
        <>
          <h2>You win!</h2>
          <p>Well Done!</p>
        </>
      )
    }

    else if(isGameLost){
      return(
        <>
          <h2>You lost!</h2>
          <p>Game over!</p>
        </>
      )
    }

    else if(wrongGuessCount > 0 && !isPreviousLetterCorrect){
      return <p className='farewell'>{getFarewellText(languageList[wrongGuessCount - 1].key)}</p>
    }

    else{
       return null
    }
  }

  //This function restarts the game
  function handleNewGame(){
    setCurrentWord(getRandomWord())
    setChosenLetter([])
    setCorrectLetter([])
  }
  
  return (
    <main>
      {isGameWon && <Confetti width={width} height={height}/>}
      <header>
        <h2>Assembly: Endgame</h2>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section 
        aria-live="polite" 
        role="status" 
        className={clsx(
        "game-status",
        isGameWon && "game-won",
        isGameLost && "game-lost"
      )}>
        {renderGameStatus()}
      </section>

      <section className='language-list'>
        {languageList}
      </section>

      <section className='currentWord'>
        {lettersList} 
      </section>

      <section className='sr-only'
               aria-live='polie'
               role='status'>
               <p>
                {currentWord.includes(isPreviousLetterCorrect) ? 
                 `Correct! The ${isPreviousLetterCorrect} is in the word` :
                 `Wrong! The ${isPreviousLetterCorrect} is not in the word`}
                You have {numGuessesLeft} remaining guesses.
               </p>

               <p>
                Current word: {currentWord.split("").map(letter => 
                chosenLetter.includes(letter) ? letter + ".": "blank")}
              </p>
      </section>

      <section className={clsx(
        "alphabet",
        isGameOver && "disabled"
      )} >
        {alphabetList}
      </section>

      {(isGameLost || isGameWon) && 
        <button className='new-game'
                onClick={handleNewGame}>New Game</button>}
    </main>
  );
}

export default App;
