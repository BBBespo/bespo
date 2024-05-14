package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.Enum.RoleType;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MemoDto {

    @Getter
    @Builder
    @Setter
    public static class readMemoResponse {
        private Integer memoId;
        private String name;
        private String content;
        private MemoType type;
        private String image;
        private String scope;

    }

    @Getter
    @Builder
    @Setter
    public static class writeMemoRequest {
        private String name;
        private String content;
        private MemoType type;
        private String image;
        private String scope;
    }

}
