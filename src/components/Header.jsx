import "../styles/header.css"


export default function Header({score, bestScore}) {
    return (
        <div className="header">
            <h1>Harry Potter Memory Game</h1>
            <div className="scores">
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
            
        </div>
    )
}