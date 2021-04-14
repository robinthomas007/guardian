import React, { Component } from 'react';
import {
  Table,
  Grid,
  Button,
  Form,
  Pagination,
  Dropdown,
  DropdownButton,
  Alert,
} from 'react-bootstrap';

class TablePager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      items: this.props.items,
      limit: 5,
      pageCount: this.props.items,
      totalItems: this.props.totalItems,
      itemsPerPage: this.props.itemsPerPage,
      pagerStart: 0,
      pagerEnd: 5,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePageNextClick = this.handlePageNextClick.bind(this);
    this.handlePagePreviousClick = this.handlePagePreviousClick.bind(this);
  }

  handlePageClick(e) {
    const pageValue = parseInt(e.target.innerHTML);
    this.setState({ activePage: pageValue });
    this.props.handlePaginationChange(pageValue);
  }

  handlePageNextClick() {
    const pageValue = parseInt(this.state.activePage) + 1;
    let buttonCount = Math.ceil(
      parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage),
    );
    let pagerStart = this.state.pagerStart;
    let pagerEnd = parseInt(this.state.pagerEnd);

    if (pageValue <= buttonCount) {
      this.setState({ activePage: pageValue });
      this.props.handlePaginationChange(pageValue);
    } else if (pageValue < 1) {
      this.setState({ pagerStart: pageValue });
    } else if (pageValue > pagerStart && pageValue < buttonCount) {
      this.setState({ pagerStart: pageValue });
    }

    if (pageValue >= pagerEnd && buttonCount > pagerEnd) {
      this.setState({ pagerStart: pageValue - 3 });
      this.setState({ pagerEnd: pageValue + 2 });
    }
  }

  handlePagePreviousClick() {
    const pageValue = parseInt(this.state.activePage) - 1;
    let buttonCount = Math.ceil(
      parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage),
    );
    let pagerStart = this.state.pagerStart;
    let pagerEnd = parseInt(this.state.pagerEnd);
    let newPagerStart = buttonCount - pagerStart;

    if (buttonCount > this.state.limit) {
      buttonCount = this.state.limit;
    }

    if (pageValue > 0) {
      this.setState({ activePage: pageValue });
      this.props.handlePaginationChange(pageValue);
    }

    if (pageValue < pagerStart && buttonCount > pagerStart) {
      this.setState({ pagerStart: pageValue - 3 > 0 ? pageValue : 0 });
      this.setState({ pagerEnd: buttonCount });
    }
  }

  componentDidUpdate() {
    let buttonCount = Math.ceil(
      parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage),
    );
    const pageValue = parseInt(this.state.activePage) - 1;

    if (pageValue > buttonCount) {
      this.setState(
        currentState => ({ activePage: buttonCount }),
        () => {
          this.props.handlePaginationChange(this.state.activePage);
        },
      );
    }
  }

  render() {
    const buttonCount = Math.ceil(
      parseInt(this.props.totalItems) / parseInt(this.props.itemsPerPage),
    );
    const paginationItems = [];
    let pagerStart = this.state.pagerStart;
    let pagerEnd = buttonCount > this.state.pagerEnd ? this.state.pagerEnd : buttonCount;

    for (var i = pagerStart; i < pagerEnd; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i + 1}
          className={this.state.activePage === i + 1 ? 'active' : ''}
          onClick={this.handlePageClick}
        >
          {i + 1}
        </Pagination.Item>,
      );
    }
    return (
      <Pagination activepage={this.state.activePage} items={5} limit={5}>
        <Pagination.Prev onClick={this.handlePagePreviousClick} />
        {paginationItems}
        <Pagination.Next onClick={this.handlePageNextClick} />
      </Pagination>
    );
  }
}

export default TablePager;
