import './App.css';
import clsx from 'clsx';
import { useState } from 'react';
import { languages } from './languages';
import Language from './Language';

function App() {

  const [currentWord, setCurrentWord] = useState("React")
  const [chosenLetter, setChosenLetter] = useState([])
  const [correctLetter, setCorrectLetter] = useState({})

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageList = languages.map(lang =>
    <Language name={lang.name} 
              key={lang.name}
              backgroundColor={lang.backgroundColor}
              color={lang.color}/>
  )
  
  const wordLetters = currentWord.split("").map((letter, index) => {

    const visibleLetter = Object.entries(correctLetter).some(([l, isCorrect])=>
      letter.toLowerCase() == l && isCorrect === true
    ) 
    
    return <span className={visibleLetter ? "visible" : undefined}       
          key={index}>{letter.toUpperCase()}</span>
  })

  const alphabetList = alphabet.split("").map(letter => (
    <button 
      onClick={()=> {handleChosenLetter(letter); checkLetter(letter)}}
      className={clsx(
        'btn',
        correctLetter[letter] === true && 'correct-letter',
        correctLetter[letter] === false && 'wrong-letter'
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

  //This function checks if the clicked letter is included in the current word, it consequently changes the isCorrect state as well. 
  function checkLetter(letter){
    const result = currentWord.toLowerCase().split("").includes(letter)

    setCorrectLetter(prevCorrectLetter => {

      const updatedCorrectLetter = {
        ...prevCorrectLetter,
        [letter]: result
      }

  
      return updatedCorrectLetter
     
    })
  }
  
  

  return (
    <main>
      <header>
        <h2>Assembly: Endgame</h2>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className='game-status'>
        <h2>You win!</h2>
        <p>Well done!</p>
      </section>

      <section className='language-list'>
        {languageList}
      </section>

      <section className='currentWord'>
        {wordLetters}
      </section>

      <section className='alphabet'>
        {alphabetList}
      </section>


      <button className='new-game'>New Game</button>
    </main>
  );
}

export default App;
