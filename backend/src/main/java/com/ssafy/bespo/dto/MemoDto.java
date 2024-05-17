package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.entity.Comment;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.List;

public class MemoDto {

    @Getter
    @Builder
    @Setter
    public static class readMemosResponse {
        private Integer memoId;
        private String name;
        private String content;
        private MemoType type;
        private String scope;
        private String writerName;
        private String writerImgUrl;
        private LocalDateTime createdAt;
        private int commentSize;
    }

    @Getter
    @Builder
    @Setter
    public static class readMemoResponse {
        private Integer memoId;
        private String name;
        private String content;
        private MemoType type;
        private String scope;
        private String writerName;
        private String writerImgUrl;
        private LocalDateTime createdAt;
        private List<Comment> comment;
    }


    @Getter
    @Builder
    @Setter
    public static class writeMemoRequest {
        private String name;
        private String content;
        private MemoType type;
        private String scope;
    }

}
