package org.factoriaf5.backend.controllers;

import java.util.Optional;

import org.factoriaf5.backend.persistence.Book;
import org.factoriaf5.backend.persistence.BooksRepository;
import org.factoriaf5.backend.persistence.Loan;
import org.factoriaf5.backend.persistence.LoansRepository;
import org.factoriaf5.backend.persistence.Member;
import org.factoriaf5.backend.persistence.MembersRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class LoanController {

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    private MembersRespository membersRepository;

    @Autowired
    private LoansRepository loansRepository;

    @PostMapping("/loans")
    public Loan createLending(@RequestBody LoanRequest request) {

        if (request.getBookId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book ID not found");
        } else if (request.getMemberId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Member ID not found");
        }

        Long idBooks = request.getBookId();
        @SuppressWarnings("null")
        Book book = booksRepository.findById(idBooks)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        Long idMember = request.getMemberId();
        @SuppressWarnings("null")
        Member member = membersRepository.findById(idMember)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));

        Loan loan = new Loan();
        loan.setBook(book);
        
        loan.setMember(member);
        loan.setLoanDate(request.getLoanDate());
        loan.setReturnDate(request.getReturnDate());

        return loansRepository.save(loan);
    }

    @GetMapping("/loans/{id}")
    public ResponseEntity<LoanResponse> getLoansById(@PathVariable Long id) {
        @SuppressWarnings("null")
        Optional<Loan> optionalLoan = loansRepository.findById(id);
        if (optionalLoan.isPresent()) {
            Loan existingLoan = optionalLoan.get();
            LoanResponse loanResponse = new LoanResponse(existingLoan.getId(),
                    existingLoan.getLoanDate(),
                    existingLoan.getReturnDate(), (existingLoan.getBook()).getBookId(),
                    (existingLoan.getMember()).getMemberId());
            return ResponseEntity.ok(loanResponse);

        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
