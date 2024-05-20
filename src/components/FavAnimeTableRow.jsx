//imports
import RankCell from "./RankCell.jsx";
import RowButtons from "./RowButtons.jsx";
import TitleCell from "./TitleCell.jsx";
import AnimeImage from "./FavAnimeImages.jsx"
import axios from 'axios'
import { useState } from 'react'

//main favorite anime table row constructor component
export default function FavAnimeTableRow({ animeListData, initialIsEditing, onDeleteRow, setAnimeListData }) {

    //declare state variables
    const [isEditing, setIsEditing] = useState(initialIsEditing)
    const [rank, setRank] = useState(animeListData.rank)
    const [title, setTitle] = useState(animeListData.title)
    const [img, setImg] = useState(animeListData.img)

    console.log(`Row: ${title} Rank: ${rank}`);

    //toggle editing mode functions
    const setEditMode = () => setIsEditing(true)
    const setNormalMode = async () => {
        const { data } = await axios.put(`http://localhost:8001/api/anime/${animeListData.id}`, {
            rank,
            title,
            img
        });
      
        if (!data.error) {
          setRank(data.rank)
          setTitle(data.title)
          setImg(data.img)
        }
      
        const list = await axios.get(`http://localhost:8001/api/anime`);
        //console.log('list: ' + JSON.stringify(list.data));
        console.log(`Set Anime List`);
        setAnimeListData(list.data);

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
            <AnimeImage url={img}/>
        </tr>
    )
}