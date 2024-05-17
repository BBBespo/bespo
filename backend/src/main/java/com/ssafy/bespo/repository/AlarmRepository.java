package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Alarm;
import com.ssafy.bespo.entity.Team;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    Alarm findByEmailAndFlagFalse(String email);

    Boolean existsByEmailAndFlagFalse(String email);

    List<Alarm> findByTeamAndFlagFalse(Team team);

}
