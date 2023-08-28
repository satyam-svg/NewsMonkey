import React, { Component } from 'react';
import Newsitems from './Newsitems';

export default class News extends Component {
  constructor() {
    super();
    console.log("hi am constructor");
    this.state = {
      articles: [],
      loading: false
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5129dc656cb648c6b57030ece01a1bd1";
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles });
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>News Monkey-Top Headlines</h2>
          <div className="row">
            {this.state.articles.map((element) => (
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
      </div>
    );
  }
}
