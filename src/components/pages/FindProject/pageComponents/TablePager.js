import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class TablePager extends Component {
  handlePageClick = data => {
    let selected = data.selected;
    this.props.handlePaginationChange(selected + 1);
  };

  render() {
    const buttonCount = Math.ceil(
      parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage),
    );
    return (
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        breakClassName={'page-item'}
        pageCount={buttonCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        breakLinkClassName={'page-link'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
      />
    );
  }
}

export default TablePager;
