import './App.css'
import FavAnimeTable from './components/FavAnimeTable.jsx'



export default function App({ initialAnimeList }) {
  return <FavAnimeTable initialAnimeList={initialAnimeList}/>
}
