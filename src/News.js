import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

const News=(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalArticles,setTotalArticles]= useState(0)
  

    const updateNews= async()=>{
      setLoading(true);
      let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=29e623fc163d425f84764f66a2bc8ecb&page=${page+1}&pageSize=${props.pageSize}`
      
      
      let data= await fetch(url)
      let parsedData=await data.json()
      setArticles(parsedData.articles)
      setTotalArticles(parsedData.totalResults)
      setLoading(false);
      
    }

    useEffect(()=>{
      updateNews()
    },[page])

    

    const handlePrev=async ()=>{
    
    setPage(page-1)
    
      
    }
    const handleNext=async ()=>{
      setPage(page+1)
    
      
    }


    return (
      <>
      
        <h2 className="d-flex justify-content-center" style={{marginTop: '50px',marginBottom: '40px', color: 'white'}}>{props.category[0].toUpperCase()+props.category.slice(1)} Top Headlines</h2>
        <div className="container">
        {loading && <Spinner />}
        <div className="row my-3">
        {!loading && articles && articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,100):""} 
        imageUrl={element.urlToImage?element.urlToImage:"https://resize.indiatvnews.com/en/resize/newbucket/400_-/2023/06/breaking-news-template-5-1685840026.jpg"} 
        newsUrl={element.url} author={element.author} time={element.publishedAt} agency={element.source.name} />
        </div>
          
        })}
       
        </div>
        
        
      </div>
      <div className="container d-flex justify-content-between">
      <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrev}>&larr; Prev</button>
      <button disabled={page+1 > Math.ceil (totalArticles / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
      
      </div>
      </>
    )
  }


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News