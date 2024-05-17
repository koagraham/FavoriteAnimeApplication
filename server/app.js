//imports
import express from 'express'
import ViteExpress from 'vite-express'
import morgan from 'morgan';
import generateId from '../src/utils/idGenerator.js'
import generateRank from '../src/utils/rankGenerator.js'
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
    {id: 0, rank: 1, title: "Mushoku Tensei"},
    {id: 1, rank: 2, title: "Death Note"},
    {id: 2, rank: 3, title: "Chainsaw Man"}
]

//read anime list
app.get('/api/anime', (req, res) => {
    console.log(`testing: ${TEST_DATA}`)
    res.json(TEST_DATA)
})

//add anime entry
app.post('/api/anime', (req, res) => {
    const { title } = req.body;
  
    const newEntry = {
      id: generateId(),
      rank: generateRank(),
      title: title || '',
    };
  
    TEST_DATA.push(newEntry);
    res.json(newEntry);
  });

//update anime entry
app.put('/api/anime/:id', (req, res) => {
    const { id } = req.params
    const { rank, title } = req.body
  
    const index = TEST_DATA.findIndex((item) => item.id === Number(id))
  
    if (index === -1) {
      res.status(404).json({ error: `Item with ID ${id} not found.` })
    } else {
      const entry = TEST_DATA[index]
  
      entry.rank = Number(rank) || entry.rank
      entry.title = title || entry.title
  
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