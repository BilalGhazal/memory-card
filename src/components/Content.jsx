import { useState, useEffect } from 'react'
import "../styles/content.css"


export default function Content({characters, onClick, score}) {
    
    const [shuffledCharacters, setShuffledCharacters] = useState(characters)

    useEffect(() => {
        if (characters.length > 0) {
            const shuffled = [...characters].sort(() => Math.random() - 0.5);
            setShuffledCharacters(shuffled);
        }
        
    }, [characters, score])


    return (
        <div className="content">
            {shuffledCharacters.map(dataObj => (
                <div className="character" key={dataObj.id} onClick={() => onClick(dataObj.id)}>
                    <img src={dataObj.image} />
                    <p>{dataObj.name}</p>
                </div>
            ))
            }
        </div>
    )
}