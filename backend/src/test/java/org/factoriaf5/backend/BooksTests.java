package org.factoriaf5.backend;

/* import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status; */

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.test.web.servlet.MockMvc;
import org.factoriaf5.backend.persistence.BooksRepository;
import org.factoriaf5.backend.persistence.Book;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@Profile("test")
class BooksTests {

    @Autowired
    private MockMvc api;
    private BooksRepository booksRepository;

    public BooksTests(@Autowired BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    @BeforeEach
    public void setup() {
        booksRepository.deleteAll();
    }

    @SuppressWarnings("null")
    @Test
    public void returnsTheExistingBooksByName() throws Exception {
        booksRepository.saveAll(List.of(
                new Book(1l, "Don Quijote", "Cervantes", "asdfasdf", "qwer"),
                new Book(2l, "Harry Potter y la piedra filosofal", "JK Rowling", "qwetqqwe", "vbxcv")));

        api.perform(get("/books?query=Harry"))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$", hasSize(1)),
                        jsonPath("$[0].id", equalTo("2l")),
                        jsonPath("$[0].title", equalTo("Harry Potter y la piedra filosofal")),
                        jsonPath("$[0].author", equalTo("JK Rowling")),
                        jsonPath("$[0].isbn", equalTo("qwetqqwe")),
                        jsonPath("$[0].section_code", equalTo("vbxcv")));
    }
}
