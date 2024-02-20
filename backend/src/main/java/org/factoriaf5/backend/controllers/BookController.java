package org.factoriaf5.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.factoriaf5.backend.persistence.Book;
import org.factoriaf5.backend.persistence.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        return repository
                .findAllByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrIsbnContainingIgnoreCaseOrSectionCodeContainingIgnoreCase(
                        query, query, query, query);
    }

    @PostMapping("/books")
    public BookResponse createBook(@RequestBody BookRequest request) {
        Book book = new Book(request.getBookId(), request.getTitle(), request.getAuthor(), request.getIsbn(),
                request.getSectionCode(), request.isLoaned());
        Book savedBook = repository.save(book);
        return new BookResponse(savedBook.getBookId(), savedBook.getTitle(), savedBook.getAuthor(),
                savedBook.getIsbn(), savedBook.getSectionCode(), savedBook.isLoaned());
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        @SuppressWarnings("null")
        Optional<Book> optionalBook = repository.findById(id);
        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();
            BookResponse bookResponse = new BookResponse(existingBook.getBookId(), existingBook.getTitle(),
                    existingBook.getAuthor(), existingBook.getIsbn(), existingBook.getSectionCode(),
                    existingBook.isLoaned());
            return ResponseEntity.ok(bookResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
