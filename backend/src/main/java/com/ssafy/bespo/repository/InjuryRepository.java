package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Injury;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface InjuryRepository extends JpaRepository<Injury, Integer> {
    // 부상 등록 순으로 조회
    @Query(value = "SELECT i.created_date FROM injury as i LEFT JOIN member as m ON i.member_id = m.member_id"
        + " WHERE i.member_id = :memberId"
        + " ORDER BY i.created_date DESC limit 1", nativeQuery = true)
    Timestamp findByMemberIdOrderByDateDesc(@Param("memberId") int memberId);
}
