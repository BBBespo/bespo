package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Alarm;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

}
