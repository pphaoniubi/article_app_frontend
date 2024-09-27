import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './ArticleList';
import ArticleContent from './ArticleContent';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/articles/:id" element={<ArticleContent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
