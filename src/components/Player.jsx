import {useState} from 'react';
export default function Player({name, symbol, isActive}) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing((editing) => !editing);
    }
    function changePlayerName(event) {
        setPlayerName(event.target.value);
    }
    return (
        <li className={isActive === symbol? 'active' : undefined}>
            <span className="player">
                {!isEditing ? <span className="player-name">{playerName}</span> :
                   <input type='text' name='player' required value={playerName} onChange={changePlayerName}/>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{!isEditing ? 'Edit': 'Save' }</button>
            
        </li>
    )
}