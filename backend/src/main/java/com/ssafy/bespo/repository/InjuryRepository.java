package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Injury;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface InjuryRepository extends JpaRepository<Injury, Integer> {

}
