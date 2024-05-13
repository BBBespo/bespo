package com.ssafy.bespo.dto;

import com.ssafy.bespo.entity.Team;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class NotificationDto {

    @Getter
    @Setter
    public class readNotification{
        private Integer notificationId;
        private String title;
        private String text;
        private String image;
        private Team team;
    }
}
