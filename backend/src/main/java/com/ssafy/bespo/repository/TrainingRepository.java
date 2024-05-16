package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Training;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Integer> {
    @Query(value = "SELECT t.training_id, t.bpm, t.distance, t.time, t.created_date, t.flag, t.modified_date, t.member_id"
        + " FROM training as t LEFT JOIN member as m ON t.member_id = m.member_id"
        + " WHERE t.member_id = :memberId", nativeQuery = true)
    List<Training> findByMemberIdAndFlagFalse(@Param("memberId") int memberId);

}
