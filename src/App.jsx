import { useEffect, useState } from 'react';
import Paginate from './components/Paginate';
import Navbar from './components/Navbar';
import NewsItem from './components/NewsItem';
import Loading from './components/Loading';

export default function App() {

  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 16;

  // calculate the startIndex and endIndex based on the currentPage and itemsPerPage
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedNews = news.slice(startIndex, endIndex);

  // fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=100'
          );
        const data = await response.json();
        setNews(data.hits);

        // total # of pages displayed corresponds to the total number of hits in the response
        const totalHits = data.hits.length;
        const totalPages = Math.ceil(totalHits / itemsPerPage);
        setTotalPages(totalPages);
      } 
      catch (error) {
        console.error('Error fetching news', error);
      }
    };
    fetchNews();
  }, [searchQuery]);

  // function to set search query
  const setQuery = (event) => {
    setSearchQuery(event.target.value);
  }

  // enter key triggers search button click
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  // fetch per search query
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${searchQuery}&hitsPerPage=100`    
      )
      const data = await response.json();
      setNews(data.hits);
      setCurrentPage(0); // Reset current pg to first page

      const totalHits = data.hits.length;
      const totalPages = Math.ceil(totalHits / itemsPerPage);
      setTotalPages(totalPages);
    } 
    catch (error) {
      console.error('Error searching news', error);
    }
  }

  // function to extract domain from url for display on page  
  const getDomainFromURL = (url) => {
    let domain = '';
    try {
        if (url) {
            const urlObject = new URL(url);
            domain = urlObject.hostname;
        }
    } 
    catch (error) {
      console.error('Error extracting domain', error);
    }
    return domain;
  };

  // function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  return (
    <div className='wrapper'>
      
      <Navbar 
        handleSearch={handleSearch}
        setQuery={setQuery}
        searchQuery={searchQuery}
        handleKeyDown={handleKeyDown}
      />

      <div>
        {news.length > 0 ? (
          <div>
            {displayedNews.map((newsItem) => (
              <NewsItem 
                key={newsItem.objectID}
                newsItem={newsItem}
                getDomainFromURL={getDomainFromURL}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      
      <Paginate 
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />

    </div>
  );
}


