import { useRef } from "react"
import "../styles/content.css"


export default function Content({characters, onClick}) {
    
    function shuffleCharacters() {
        const shuffledCharacters = [...characters].sort(() => Math.random() - 0.5)

        return shuffledCharacters.map(dataObj => {
            return (
                <div className="character" key={dataObj.id} onClick={() => onClick(dataObj.id)}>
                    <img src={dataObj.image} />
                    <p>{dataObj.name}</p>
                </div>
            )
        })
    }


    return (
        <div className="content">
           {shuffleCharacters()}
        </div>
    )
}