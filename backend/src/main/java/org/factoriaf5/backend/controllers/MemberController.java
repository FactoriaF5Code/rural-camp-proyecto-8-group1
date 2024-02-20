package org.factoriaf5.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.factoriaf5.backend.persistence.Member;
import org.factoriaf5.backend.persistence.MembersRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private MembersRespository respository;

    public MemberController(@Autowired MembersRespository respository) {
        this.respository = respository;
    }

    @GetMapping("/members")
    public List<Member> searchMembers(@RequestParam("query") String query) {
        return respository
                .findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrDniContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        query, query, query, query);
    }

    @PostMapping("/members")
    public MemberResponse createMember(@RequestBody MemberRequest request) {
        Member member = new Member(request.getMemberId(), request.getFirstName(), request.getLastName(),
                request.getDni(), request.getEmail());
        Member savedMember = respository.save(member);
        return new MemberResponse(savedMember.getMemberId(), savedMember.getFirstName(),
                savedMember.getLastName(), savedMember.getDni(), savedMember.getEmail());
    }

    @GetMapping("/members/{id}")
    public ResponseEntity<MemberResponse> getMemberById(@PathVariable Long id) {
        @SuppressWarnings("null")
        Optional<Member> optionalMember = respository.findById(id);
        if (optionalMember.isPresent()) {
            Member existingMember = optionalMember.get();
            MemberResponse memberResponse = new MemberResponse(existingMember.getMemberId(),
                    existingMember.getFirstName(),
                    existingMember.getLastName(), existingMember.getDni(), existingMember.getEmail());
            return ResponseEntity.ok(memberResponse);

        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
