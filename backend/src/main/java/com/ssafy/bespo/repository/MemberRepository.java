package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Member findByMemberIdAndFlagFalse(int memberId);

}
