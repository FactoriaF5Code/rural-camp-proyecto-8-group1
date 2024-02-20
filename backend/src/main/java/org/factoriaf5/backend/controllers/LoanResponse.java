package org.factoriaf5.backend.controllers;

import java.time.LocalDate;

public class LoanResponse {

    private Long loanId;
    private LocalDate loanDate;
    private LocalDate returnDate;
    private Long bookId;
    private Long memberId;
    
    public Long getLoanId() {
        return loanId;
    }
    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }
    public LocalDate getLoanDate() {
        return loanDate;
    }
    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }
    public LocalDate getReturnDate() {
        return returnDate;
    }
    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
    public Long getBookId() {
        return bookId;
    }
    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
    public Long getMemberId() {
        return memberId;
    }
    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
    public LoanResponse(Long loanId, LocalDate loanDate, LocalDate returnDate, Long bookId, Long memberId) {
        this.loanId = loanId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
        this.bookId = bookId;
        this.memberId = memberId;
    }
    
}