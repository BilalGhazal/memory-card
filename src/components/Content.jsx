import "../styles/content.css"


export default function Content({characters, onClick}) {
    return (
        <div className="content">
            {characters.map(dataObj => {
                return (
                    <div className="character" key={dataObj.id} onClick={() => onClick(dataObj.id)}>
                        <img src={dataObj.image} />
                        <p>{dataObj.name}</p>
                    </div>
                )
            })}
        </div>
    )
}