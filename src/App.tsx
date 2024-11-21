import { FunctionComponent, useState } from 'react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';

const App: FunctionComponent = () => {
  // State
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <>
      {/* Header */}
      <header className='bg-dark sticky-top'>
        <div className='d-flex p-3 mb-4 align-items-center justify-content-between'>
          <h1 className='text-white fw-bold mb-0'>PokeApp</h1>
          <SearchBar className='my-2 w-50' onSearchChange={(e) => setSearchTerm(e)} />
        </div>
      </header>

      {/* Main section */}
      <main className='p-3'>
        <PokemonList searchTerm={searchTerm} />
      </main>
    </>
  );
};

export default App;
