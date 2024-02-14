package org.factoriaf5.backend.controllers;

import java.util.List;

import org.factoriaf5.backend.persistence.Book;
import org.factoriaf5.backend.persistence.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private BooksRepository repository;

    public BookController(@Autowired BooksRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/books")
    public List<Book> searchBooks(@RequestParam("query") String query) {
        return repository.searchBooks("%" + query + "%");
    }

    @PostMapping("/books")
    public BookResponse createBook(@RequestBody BookRequest request) {
        Book book = new Book(request.getBook_id(), request.getTitle(), request.getAuthor(), request.getIsbn(),
                request.getSectionCode());
        Book savedBook = repository.save(book);
        return new BookResponse(savedBook.getBook_id(), savedBook.getTitle(), savedBook.getAuthor(),
                savedBook.getIsbn(), savedBook.getSectionCode());
    }

}
