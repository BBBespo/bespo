package com.ssafy.bespo.dto;

import com.ssafy.bespo.Enum.MemoType;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

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

}
