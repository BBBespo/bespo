package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Event;
import com.ssafy.bespo.entity.Team;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByEventIdAndFlagFalse(int eventId);

    List<Event> findAllByTeamAndFlagFalse(Team team);

}
