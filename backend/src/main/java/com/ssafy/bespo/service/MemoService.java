package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;
    private final MemberRepository memberRepository;

    public List<MemoDto.readMemoResponse> getPlayerMemos(int memberId, MemoType type){

        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        Team team = member.getTeam();
        List<Memo> memos = memoRepository.findByTeamAndTypeAndFlagFalse(team, type);

        List<MemoDto.readMemoResponse> responses = new ArrayList<>();
        for(Memo memo : memos){
            MemoDto.readMemoResponse response = MemoDto.readMemoResponse.builder()
                    .memoId(memberId)
                    .scope(memo.getScope())
                    .image(memo.getImage())
                    .content(memo.getContent())
                    .name(memo.getName())
                    .type(memo.getType())
                    .build();
            responses.add(response);
        }

        return responses;
    }

}
