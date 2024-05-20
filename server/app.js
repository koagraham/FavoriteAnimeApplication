//imports
import express from 'express'
import ViteExpress from 'vite-express'
import morgan from 'morgan';
import generateId from '../src/utils/idGenerator.js'
import generateRank from '../src/utils/rankGenerator.js'
import fetchAnimeInfo from './api.js'
import cors from 'cors';

//declare server variables
const app = express();
const port = '8001';

//express configuration to use POST and PUT
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

ViteExpress.config({ printViteDevServerHost: true });

//test data
const TEST_DATA = [
    {id: 0, rank: 1, title: "Mushoku Tensei", img: ''},
    {id: 1, rank: 2, title: "Death Note", img: ''},
    {id: 2, rank: 3, title: "Chainsaw Man", img: ''}
]

//initial api call
const grabTestImages = async (title) => {
  for (const anime of TEST_DATA) {
    const img = await fetchAnimeInfo(anime.title)
    anime.img = img
  }
}

//initial api call
grabTestImages()

//future api calls
const grabTestImage = async (title) => {
  return await fetchAnimeInfo(title)
}

const reorder = (index, oldRank, newRank) => {
  //const rank = TEST_DATA[id].rank;
  //console.log('Rank: ' + rank);
  TEST_DATA.forEach(item => {
    if (item.id != index) {
      console.log(`Id: ${item.id} Old Rank: ${item.rank}`);
      if (newRank < oldRank) {
        if (item.rank < oldRank && item.rank >= newRank) {
          item.rank += 1;
          console.log(`Id: ${item.id} new Rank: ${item.rank}`);
        }        
      } else if (newRank > oldRank) {
        if (item.rank > oldRank && item.rank <= newRank) {
          item.rank -= 1;
          console.log(`Id: ${item.id} New Rank: ${item.rank}`);
        }
      }
      // if (oldRank > newRank)
      // if (item.rank >= rank ) {
      //   item.rank++;
      //   console.log(`Id: ${item.id} New Rank: ${item.rank}`);
      // }
    }
  });
}

//read anime list
app.get('/api/anime', (req, res) => {
  res.json(TEST_DATA)
})

//add anime entry
app.post('/api/anime', (req, res) => {  
  const newEntry = {
    id: generateId(),
    rank: generateRank(),
    title: 'title',
    img: 'https://example.com/placeholder.jpg'
  };
  
    TEST_DATA.push(newEntry);
    res.json(newEntry);
})

//update anime entry
app.put('/api/anime/:id', async (req, res) => {
    const { id } = req.params
    const { rank, title } = req.body
  
    const index = TEST_DATA.findIndex((item) => item.id === Number(id))
  
    if (index === -1) {
      res.status(404).json({ error: `Item with ID ${id} not found.` })
    } else {
      const entry = TEST_DATA[index]
      const oldRank = entry.rank;
      entry.rank = Number(rank) || entry.rank
      entry.title = title || entry.title
      entry.img = await grabTestImage(title) || entry.img
      if (rank) {
        console.log('Reordering');
        reorder(id, oldRank, rank);
      }
      res.json(entry)
    }


})

//delete anime entry
app.delete('/api/anime/:id/delete', (req, res) => {
    const { id } = req.params
    const index = TEST_DATA.findIndex((item) => item.id === Number(id))
    if (index === -1) {
      res.status(404).json({ error: `Item with ID ${id} not found.` })
    } else {
      TEST_DATA.splice(index, 1)
      res.json({ id: Number(id) })
    }
})

//launch server
ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));