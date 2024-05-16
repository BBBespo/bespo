package com.ssafy.bespo.entity;

import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.dto.TrainingDto;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Training extends BaseTime {

    @Id @GeneratedValue
    @Column(name = "training_id")
    private Integer trainingId;

    private Integer bpm;

    private double distance;

    private String time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public TrainingDto.readTrainingResponse toReadTrainingResponse() {
        TrainingDto.readTrainingResponse response = TrainingDto.readTrainingResponse.builder()
            .bpm(this.bpm)
            .distance(this.distance)
            .time(this.time)
            .build();
        return response;
    }
}
