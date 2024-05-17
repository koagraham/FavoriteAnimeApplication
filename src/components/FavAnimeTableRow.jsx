//imports
import RankCell from "./RankCell.jsx";
import RowButtons from "./RowButtons.jsx";
import TitleCell from "./TitleCell.jsx";
import AnimeImage from "./FavAnimeImages.jsx"
import axios from 'axios'
import { useState } from 'react'

//main favorite anime table row constructor component
export default function FavAnimeTableRow({ animeListData, initialIsEditing, onDeleteRow }) {

    //declare state variables
    const [isEditing, setIsEditing] = useState(initialIsEditing)
    const [rank, setRank] = useState(animeListData.rank)
    const [title, setTitle] = useState(animeListData.title)

    //toggle editing mode functions
    const setEditMode = () => setIsEditing(true)
    const setNormalMode = async () => {
        const { data } = await axios.put(`http://localhost:8001/api/anime/${animeListData.id}`, {
            rank,
            title,
        })
      
        if (!data.error) {
          setRank(data.rank)
          setTitle(data.title)
        }
      
        setIsEditing(false);
      };

    //return html
    return (
        <tr>
            <RowButtons isEditing={isEditing}
            onEditClick={setEditMode} 
            onSaveClick={setNormalMode}
            onDeleteClick={onDeleteRow}/>
            <RankCell value={rank}
            isEditing={isEditing}
            onValueChange={setRank}/>
            <TitleCell value={title} 
            isEditing={isEditing}
            onValueChange={setTitle}/>
            <AnimeImage title={title}/>
        </tr>
    )
}