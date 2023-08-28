import React, { Component } from 'react';
import Newsitems from './Newsitems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 6,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalresults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-News Monkey`;
  }

  async componentDidMount() {
    await this.fetchData(this.state.page);
  }

  fetchData = async (pageNumber) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5129dc656cb648c6b57030ece01a1bd1&page=${pageNumber}&pagesize=${this.props.pagesize || 10}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedData = await response.json();
    this.setState({
      articles: parsedData.articles,
      page: pageNumber,
      loading: false,
      totalresults: parsedData.totalResults
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

  fetchData1 = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5129dc656cb648c6b57030ece01a1bd1&page=${nextPage}&pagesize=${this.props.pagesize || 10}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedData = await response.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: nextPage,
      loading: false,
      totalresults: parsedData.totalResults
    });
  };

  render() {
    return (
      <div>
        
          <h2 className='text-center'>News Monkey-Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchData1}
            hasMore={this.state.page + 1 <= this.state.totalresults / (this.props.pagesize || 10)}
            loader={<Spinner />}
          >
            <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div key={element.url} className="col-md-4">
                  <Newsitems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    url={element.urlToImage}
                    newurl={element.url}
                    author={!element.author ? "Unknown" : element.author}
                    date={element.publishedAt}
                  />
                </div>
                
              ))}
            </div>
            </div>
          </InfiniteScroll>
      </div>
    );
  }
}
