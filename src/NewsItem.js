import React from 'react'

const NewsItem=(props)=>{
  
    let {title,description,imageUrl,newsUrl,author,time,agency}=props
    return (
      <div> 
        <div className="card" style={{width: "18rem", marginBottom:'20px'}}>
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark" style={{zIndex:'1'}}>{agency}</span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body bg-primary-subtle text-primary-emphasis " >
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(time).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
            
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
