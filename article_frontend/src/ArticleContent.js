import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ArticleContent = () => {
    const { id } = useParams(); // Get the article ID from the URL
    const [article, setArticle] = useState(null);
    console.log(id);

    useEffect(() => {
        // Function to fetch article data
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/articles/${id}`);
                setArticle(response.data);

                // Increment the read count
                await incrementReadCount(id);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);

    // Function to increment the read count
    const incrementReadCount = async (articleId) => {
        try {
            await axios.post(`http://localhost:8080/api/articles/${articleId}/increment-read-count`);
            // You might want to handle any additional logic here, like updating state
        } catch (error) {
            console.error("Error incrementing read count:", error);
        }
    };

    if (!article) return <p>Loading...</p>;

    // Format the content to include line breaks
    const formattedContent = article.content.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br /> {/* Add line break */}
        </span>
    ));

    return (
        <div>
            <h1>{article.title}</h1>
            <div>
                <FontAwesomeIcon icon={faEye} /> {article.readCount} {/* Eye icon with read count */}
            </div>
            <div>{formattedContent}</div> {/* Use <div> instead of <p> */}
        </div>
    );
};

export default ArticleContent;
