//imports
import FavAnimeTableHeader from "./FavAnimeTableHeader.jsx"
import FavAnimeTableRow from "./FavAnimeTableRow.jsx"
import FavAnimeAddButton from "./FavAnimeAddButton.jsx"
import axios from 'axios'
import { useState } from 'react'

//main component
export default function FavAnimeTable({ initialAnimeList }) {

    //declate state variables
    const [animeList, setAnimeList] = useState(initialAnimeList)

    //add anime entry function
    const addRow = async () => {
        const { data } = await axios.post('http://localhost:8001/api/anime', { title: 'Anime Title'});
        const newAnime = { ...data, isEditing: true };
        setAnimeList([...animeList, newAnime]);
      }
    
    //remove anime entry function
    const deleteRow = async (id) => {
        const { data } = await axios.delete(`http://localhost:8001/api/anime/${id}/delete`);
        if (!data.error) {
            const newAnimeList = [...animeList];
        
            const index = newAnimeList.findIndex((entry) => entry.id === data.id);
            newAnimeList.splice(index, 1);
            setAnimeList(newAnimeList);
        }
    }

    //create table rows based on anime list
    const rows = animeList.map(({ id, rank, title, isEditing }) => (
        <FavAnimeTableRow 
        key={id}
        animeListData={{ id, rank, title }}
        initialIsEditing={isEditing}
        onDeleteRow={() => deleteRow(id)}/>
    ))

    //return html
    return (
        <table>
            <thead>
                <FavAnimeTableHeader />
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                <FavAnimeAddButton onClick={addRow}/>
            </tfoot>
        </table>
    )
}