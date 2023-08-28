import React, { Component } from 'react'

export default class Nesitems extends Component {
  render() {
    let {title,description,url,newurl}=this.props;
    return (
        <div className="card" style={{width: '18rem'}}>
        <img src={!url?"https://images.wsj.net/im-839351/social":url} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{!description?"Failed loading this news":description}...</p>
          <a rel="noreferrer" href={newurl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}
