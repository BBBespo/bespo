package com.ssafy.bespo.dto;

import com.ssafy.bespo.entity.Team;
import lombok.*;

import java.time.LocalDateTime;

public class NotificationDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class readNotificationRequest {
        private Integer notificationId;
        private String title;
        private String writer;
        private String text;
        private String image;
        private TeamDto.ReadTeam team;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    public static class writeNotificationRequest {
        private String title;
        private String text;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class modifyNotificationRequest {
        private Integer notificationId;
        private String title;
        private String writerId;
        private String text;
    }

}
