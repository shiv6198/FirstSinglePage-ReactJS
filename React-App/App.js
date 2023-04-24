import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Blog() {
const [blogs, setBlogs] = useState([]);
const [news, setNews] = useState([]);
const [activeLink, setActiveLink] = useState('google');

const blogsPerPage = 3;

useEffect(() => {
fetch('post.xml')
.then((response) => response.json())
.then((data) => {
setBlogs(data);
});
axios
.get(
'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f3e865dc45974b52917a8764d1ce1216'
)
.then((res) => {
setNews(res.data.articles);
})
.catch((err) => console.log(err));
}, []);

const handleLinkClick = (source) => {
setActiveLink(source);
};





const pageNumbers = [];
for (let i = 1; i <= Math.ceil(news.length / blogsPerPage); i++) {
pageNumbers.push(i);
}

return (
<div className="App">
<h1>The Blog News</h1>
<header className="App-header">
<nav className="navbar">
<ul>
<li>
<a
className={activeLink === 'google' ? 'active' : ''}
href="#google-news"
onClick={() => handleLinkClick('google')}
>
Google News
</a>
</li>
<li>
<a
className={activeLink === 'json' ? 'active' : ''}
href="#json-news"
onClick={() => handleLinkClick('json')}
>
The XML News
</a>
</li>
</ul>
</nav>
</header>

  
      <div className="cont">

        {activeLink === 'google' && (
          <>

            <h2>Google News</h2>
            <div className="card-cont">
              {news.map((article) => (
                <div className="card" key={article.title}>
                  <img
                    className="card-img"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                  <div className="card-cont">
                 

                    <h2> <a href='https://www.cnbc.com' target="_SEJ" rel="noreferrer" className="card-title">{article.title} </a></h2>
                    <p className="card-date">
                      <em>{article.publishedAt}</em>
                    </p>
                    <p className="card-author">By{article.author}</p>
                    <p className="card-desc">{article.description}</p>
                  </div>
                </div>
              ))}
            </div>
        


       
          </>
        )}
        {activeLink === 'json' && (
          <>
          <h2>The Xml News</h2>
            {Object.keys(blogs).map((key) => (
              
              <div className="card" key={key}>
                <img
                  className="card-image"
                  src={blogs[key].image}
                  alt={blogs[key].title}
                />
                <div className="card-content">
                  <h1 className="card-title">{blogs[key].title}</h1>
                  <p className="card-date">{blogs[key].date}</p>
                  <p className="card-author">{blogs[key].author}</p>
                  <p className="card-summary">{blogs[key].summary}</p>
                  <p className="card-url">{blogs[key].url}</p>
                </div>
              </div>
            ))}
          </>
        )}
        
      </div>
   
         
      <footer className="footer">
        <p>&copy; 2023 My Blogs News App</p>
      </footer>
      
    </div>
    
  );
}

export default Blog;
