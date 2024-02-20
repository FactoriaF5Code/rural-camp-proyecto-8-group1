package org.factoriaf5.backend.controllers;

public class MemberRequest {
    private Long memberId;
    private String firstName;
    private String lastName;
    private String dni;
    private String email;

    public MemberRequest(Long memberId, String firstName, String lastName, String dni, String email) {
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dni = dni;
        this.email = email;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getDni() {
        return dni;
    }

    public String getEmail() {
        return email;
    }

}
