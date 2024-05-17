package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Injury;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Status;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {

    @Query(value = "SELECT s.created_date FROM status as s LEFT JOIN member as m ON s.member_id = m.member_id"
        + " WHERE s.member_id = :memberId"
        + " ORDER BY s.created_date DESC limit 1", nativeQuery = true)
    Timestamp findByMemberIdOrderByDateDesc(@Param("memberId") int memberId);

    List<Status> findByMemberAndFlagFalse(Member member);
}
