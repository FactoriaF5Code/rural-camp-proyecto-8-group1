package org.factoriaf5.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembersRespository extends JpaRepository<Member, Long> {

    List<Member> findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrDniContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName, String lastName, String dni, String email);
}
