package com.example.article_backend.ArticleClass;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;
    private String category;
    private int readCount; // New field for read count
    private LocalDate publishDate;

    // Constructor
    public Article(int id, String title, String content, String category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.readCount = 0; // Initialize read count to 0
        this.publishDate = LocalDate.now();
    }

    public Article() {}

    // Getters and Setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getReadCount() {
        return readCount;
    }

    public void incrementReadCount() {
        this.readCount++; // Increment the read count by 1
    }

    public LocalDate getPublishDate() { return publishDate; }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public void setReadCount(int readCount) {
        this.readCount = readCount;
    }
}
