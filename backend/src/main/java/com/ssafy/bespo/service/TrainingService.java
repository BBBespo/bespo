package com.ssafy.bespo.service;

import com.ssafy.bespo.dto.TrainingDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Training;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.TrainingRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrainingService {

    private final TrainingRepository trainingRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final MemberRepository memberRepository;

    public int registerTraining(String accessToken, TrainingDto.writeTrainingRequest request){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        Training training = Training.builder()
            .bpm(request.getBpm())
            .distance(request.getDistance())
            .time(request.getTime())
            .member(member)
            .build();

        trainingRepository.save(training);
        return memberId;
    }

    //
    public List<TrainingDto.readTrainingResponse> readTraining(String accessToken){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        List<Training> trainingList = trainingRepository.findByMemberIdAndFlagFalse(memberId);
        List<TrainingDto.readTrainingResponse> responses = new ArrayList<>();

       for(Training training : trainingList){
           responses.add(training.toReadTrainingResponse());
       }

        return responses;
    }

}
