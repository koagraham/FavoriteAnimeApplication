//imports
import FavAnimeTableHeader from "./FavAnimeTableHeader.jsx"
import FavAnimeTableRow from "./FavAnimeTableRow.jsx"
import FavAnimeAddButton from "./FavAnimeAddButton.jsx"
import axios from 'axios'
import { useState, useEffect } from 'react'
import './FavAnimeTable.css'

//main component
export default function FavAnimeTable({ initialAnimeList }) {

    //declate state variables
    const [animeList, setAnimeList] = useState(initialAnimeList)
    //const [rows, setRows] = useState()
    

    //add anime entry function
    const addRow = async () => {
        const { data } = await axios.post('http://localhost:8001/api/anime', { title: 'Anime Title'});
        const newAnime = { ...data, isEditing: false };
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

    //initial sorting and rendering

    let sortedAnimeList = animeList.slice().sort((a, b) => a.rank - b.rank);

    let rows = sortedAnimeList.map(({ id, rank, title, img, isEditing }) => (
        <FavAnimeTableRow 
        key={id}
        animeListData={{ id, rank, title, img }}
        initialIsEditing={isEditing}
        setAnimeListData={setAnimeList}
        onDeleteRow={() => deleteRow(id)}/>
    ))

    useEffect(() => {
        //sort the list based on rankings
        console.log('List: ');
        console.log(animeList);
        const sortedAnimeList = animeList.slice().sort((a, b) => a.rank - b.rank);
        console.log('Sorted List: ');
        console.log(sortedAnimeList);

        //console.log(`ID: ${id} rank: ${rank} img: ${img}`);
        //create table rows based on anime list
        rows = sortedAnimeList.map(({ id, rank, title, img, isEditing }) => (
            <FavAnimeTableRow 
            key={id}
            animeListData={{ id, rank, title, img }}
            initialIsEditing={isEditing}
            onDeleteRow={() => deleteRow(id)}
            setAnimeListData={setAnimeList}/>
        ))

        //setRows(newRows)

    }, animeList)
    
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