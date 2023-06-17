export default function Navbar({handleSearch, setQuery, searchQuery, handleKeyDown}) {
 
    return (
        <nav>
        <h1>Hacker News</h1>
        <input 
          className='search'
          type='text' 
          onChange={setQuery}
          onKeyDown={handleKeyDown} 
          value={searchQuery}
        />
        <button 
          className='search'
          onClick={handleSearch}
        >Search
        </button>
      </nav> 
    )
}
    