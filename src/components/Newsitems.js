import React, { Component } from 'react'

export default class Nesitems extends Component {
  render() {
    let {title,description,url,newurl,date,author}=this.props;
    return (
        <div className="card my-5" style={{width: '18rem'}}>
        <img src={!url?"https://images.wsj.net/im-839351/social":url} className="card-img-top" alt="..."/>
        <div className="card-body my-5">
       
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{!description?"Failed loading this news":description}...</p>
          <p class="card-text"><small class="text-body-secondary">{author}-- Last updated {new Date(date).toGMTString()} mins ago</small></p>
          <a rel="noreferrer" href={newurl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}
