import './App.css';
import { useState } from 'react';
import { languages } from './languages';
import Language from './Language';

function App() {

  const [currentWord, setCurrentWord] = useState("React")

  const languageList = languages.map(lang =>
    <Language name={lang.name} 
              key={lang.name}
              backgroundColor={lang.backgroundColor}
              color={lang.color}/>
  )
  
  const wordLetters = currentWord.split("").map((letter, index) => {
    const upperCase = letter.toUpperCase()
    return <span key={index}>{upperCase}</span>
  })

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const alphabetList = alphabet.split("").map(letter => (
    <button key={letter}>{letter.toUpperCase()}</button>
  ))

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
