import ReactPaginate from 'react-paginate';

export default function Paginate({ handlePageChange, currentPage, totalPages }) {

  return (
    <ReactPaginate
      previousLabel={currentPage === 0 ? null :'Previous'}
      nextLabel={currentPage === totalPages -1 ? null : 'Next'}
      breakLabel={'...'}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      renderOnZeroPageCount={null}
    />
  );
}

//https://www.npmjs.com/package/react-paginate?activeTab=readme
// https://www.youtube.com/watch?v=Y48V8gNUvew