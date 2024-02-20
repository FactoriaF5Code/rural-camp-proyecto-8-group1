package org.factoriaf5.backend.controllers;

import java.time.LocalDate;

public class LoanRequest {

    private Long bookId;
    private Long memberId;
    private LocalDate loanDate;
    private LocalDate returnDate;

    public Long getBookId() {
        return bookId;
    }
    public Long getMemberId() {
        return memberId;
    }
    public LocalDate getLoanDate() {
        return loanDate;
    }
    public LocalDate getReturnDate() {
        return returnDate;
    }

    
}