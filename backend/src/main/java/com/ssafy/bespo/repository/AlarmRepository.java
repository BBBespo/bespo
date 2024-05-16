package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Alarm;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

    Alarm findByEmailAndFlagFalse(String email);

    Boolean existsByEmailAndFlagFalse(String email);

}
