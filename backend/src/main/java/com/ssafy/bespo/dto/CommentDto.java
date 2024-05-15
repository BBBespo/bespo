package com.ssafy.bespo.dto;

import lombok.*;

public class CommentDto {

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReadComment{
        private int commentId;
        private String content;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WriteComment{
        private int memoId;
        private String content;
    }

}
