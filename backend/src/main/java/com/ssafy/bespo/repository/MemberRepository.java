package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findByMemberIdAndFlagFalse(int memberId);
    Member findByEmailAndFlagFalse(String email);

    Optional<Member> findByEmail(String email);



}
