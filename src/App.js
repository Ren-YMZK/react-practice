import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextUrl(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, [])
  
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  //console.log(pokemonData);

  const hundleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setLoading(false);
  };

  const hundlePrevPage = () => {
    
  };



  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return < Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className='btn'>
              <button onClick={hundlePrevPage}>前へ</button>
              <button onClick={hundleNextPage}>次へ</button>
            </div>
        </>}
      </div>
    </>
  );
}

export default App;
