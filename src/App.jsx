import { useState, useEffect, useRef } from 'react'
import './styles/App.css'
import Header from "./components/Header.jsx"
import Content from "./components/Content.jsx"

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [characters, setCharacters] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [id, setId] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const hasFetched = useRef(false)


  function handleClick(characterId) {
    console.log(characterId)
    console.log(gameOver)
    if (id.includes(characterId)) {
      setGameOver(true)
      return
    }

    setScore(prevScore => prevScore + 1)
    setId(id => [...id, characterId])
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const characterIds = [
      "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
      "4c7e6819-a91a-45b2-a454-f931e4a7cce3",
      "c3b1f9a5-b87b-48bf-b00d-95b093ea6390",
      "af95bd8a-dfae-45bb-bc69-533860d34129",
      "ca3827f0-375a-4891-aaa5-f5e8a5bad225",
      "3569d265-bd27-44d8-88e8-82fb0a848374",
      "36bfefd0-e0bb-4d11-be98-d1ef6117a77a",
      "3db6dc51-b461-4fa4-a6e4-b1ff352221c5",
      "d5c4daa3-c726-426a-aa98-fb40f3fba816"
    ]

    const fetchAllCharacters = async () => {
      
      try {

        const promises = characterIds.map(id => fetch(`https://hp-api.onrender.com/api/character/${id}`).then(response => response.json()))

        const responses = await Promise.all(promises)

        const characterData = responses.map(json => ({

          id: json[0].id,
          name: json[0].name,
          image: json[0].image

        }))

        setCharacters(characterData)

      } catch (error) {

        console.log("Failed to fetch characters", error)
        setError(error.message)

      } finally {

        setLoading(false)

      }
    }

    fetchAllCharacters()
    
  }, [])


  useEffect(() => {
    
    setBestScore(prevBestScore => Math.max(prevBestScore, score))

  }, [score])


  return (
    <>
      <Header score={score} bestScore={bestScore} />

      {gameOver ? (
          <div className="gameover">
            <p>Game Over</p>
            <button type="button" 
            onClick={() => 
              {
                setGameOver(false)
                setScore(0)
                setId([])
              }}
              
              >Play Again</button>
          </div>
        ) : score === 9 ? (

            <div className="won">
              <p>You won!</p>
              <button type="button" 
              onClick={() => 
                {
                  setGameOver(false)
                  setScore(0)
                  setId([])
                }}
                
                >Play Again</button>
          </div>
        ) : (
          <Content characters={characters} onClick={handleClick} />
      )}
    </>
  )
}

export default App
