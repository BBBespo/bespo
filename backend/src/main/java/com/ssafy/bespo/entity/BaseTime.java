package com.ssafy.bespo.entity;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Inheritance;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;

import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTime {

    @CreatedDate    // 데이터 생성할 때 시간 자동 생성
    private LocalDateTime createdDate;

    @LastModifiedDate   // 데이터 수정할 때 시간 자동 수정
    private LocalDateTime modifiedDate;

    @NotNull
    @ColumnDefault("0")
    private boolean flag; // 삭제할 경우 true로 update

    public LocalDateTime getCreateDate(){
        return this.createdDate;
    }

    public void shallowDelete(){
        this.flag = true;
    }
}
