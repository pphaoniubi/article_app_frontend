import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './ArticleList.css';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch article titles and details
        fetch('https://goldfish-app-a5skb.ondigitalocean.app/api/articles/titles')
            .then(response => response.json())
            .then(data => setArticles(data));
    }, []);

    return (
        <div className="article-list">
            <h1>Article Titles</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <Link to={`/articles/${article.id}`} className="article-title">
                            {article.title}
                            <div className="article-info">
                                <span>
                                    <FontAwesomeIcon icon={faEye} /> {article.read_count}
                                </span>
                                <p>Published On: {new Date(article.publish_date).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;
