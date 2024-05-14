package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Notification;
import com.ssafy.bespo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findAllByTeamAndFlagFalseOrderByCreatedDateDesc(Team team);
    Notification findByNotificationIdAndFlagFalse(int notificationId);

}
