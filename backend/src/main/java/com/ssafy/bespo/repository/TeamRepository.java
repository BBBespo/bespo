package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    Boolean existsByNameAndFlagFalse(String name);

    Team findByCodeAndFlagFalse(String code);

    Team findByTeamIdAndFlagFalse(int teamId);


}
