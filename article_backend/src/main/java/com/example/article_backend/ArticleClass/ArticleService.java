package com.example.article_backend.ArticleClass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public void incrementReadCount(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException ("Article not found with id: " + id));

        article.incrementReadCount(); // Increment the read count
        articleRepository.save(article); // Save the updated article
    }

    public int getReadCount(long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
        return article.getReadCount(); // Return the read count
    }

    public List<Map<String, Object>> getAllArticleInfo() {
        return articleRepository.findAll().stream()
                .map(article -> {
                    Map<String, Object> titleInfo = new HashMap<>();
                    titleInfo.put("id", article.getId());
                    titleInfo.put("title", article.getTitle());
                    titleInfo.put("category", article.getCategory()); // Assuming getCategory() returns the category
                    titleInfo.put("publish_date", article.getPublishDate()); // Assuming getPublishDate() returns the publish date
                    titleInfo.put("read_count", article.getReadCount());
                    return titleInfo;
                }).collect(Collectors.toList());
    }

    public Optional<Article> getArticleById(Long id){
        return articleRepository.findById(id);
    }
}