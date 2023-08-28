import React, { Component } from 'react';
import Newsitems from './Newsitems';
import Spinner from './Spinner';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    await this.fetchData(this.state.page);
  }

  fetchData = async (pageNumber) => {
    const url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5129dc656cb648c6b57030ece01a1bd1&page=${pageNumber}&pagesize=${this.props.pagesize || 10}`;
    this.setState({loading: true})
    const response = await fetch(url);
    const parsedData = await response.json();
    this.setState({
      articles: parsedData.articles,
      page: pageNumber,
      loading: false
    });
  };

  handlePrev = async () => {
    const { page } = this.state;
    if (page > 1) {
      await this.fetchData(page - 1);
    }
  };

  handleNext = async () => {
    const { page } = this.state;
    await this.fetchData(page + 1);
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>News Monkey-Top Headlines</h2>
          { this.state.loading &&<Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => (
              <div key={element.url} className="col-md-4">
                
                <Newsitems
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  url={element.urlToImage}
                  newurl={element.url}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page < 1}
            onClick={this.handlePrev}
             type="button"
            className="btn btn-primary"
          >
            Previous
          </button>
          <button
            onClick={this.handleNext}
            type="button"
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
