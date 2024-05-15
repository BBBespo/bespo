package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.dto.CommentDto;
import com.ssafy.bespo.dto.MemoDto;
import com.ssafy.bespo.entity.Comment;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.CommentRepository;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final CommentRepository commentRepository;

    public boolean isAuthentic(String[] scopes, Member reader, Member writer){
        if(writer.equals(reader))
            return true;
        for(String scope : scopes)
            if(scope.equals(reader.getRole().toString()))
                return true;
        return false;
    }

    public MemoDto.readMemoResponse getPlayerMemo(int memoId, String accessToken){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member reader = memberRepository.findByMemberIdAndFlagFalse(memberId);

        if(reader == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        Memo memo = memoRepository.findByMemoIdAndFlagFalse(memoId);

        Member writer = memo.getMember();

        String[] scopes = memo.getScope().split(" ");

        if(!isAuthentic(scopes, reader, writer))
            throw new CustomException(ErrorCode.NO_AUTHENTICATION);

        MemoDto.readMemoResponse response = MemoDto.readMemoResponse.builder()
                .memoId(memo.getMemoId())
                .type(memo.getType())
                .name(memo.getName())
                .content(memo.getContent())
                .image(memo.getImage())
                .scope(memo.getScope())
                .writerName(writer.getName())
                .writerImgUrl(writer.getImgUrl())
                .comment(commentRepository.findCommentsByMemoAndFlagFalseOrderByCreateDate(memo))
                .createdAt(memo.getCreatedDate())
                .build();

        return response;
    }


    public int registerMemo(String accessToken, MemoDto.writeMemoRequest request, String imgUrl){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        Memo memo = Memo.builder()
                .team(member.getTeam())
                .member(member)
                .type(request.getType())
                .scope(request.getScope())
                .name(request.getName())
                .content(request.getContent())
                .image(imgUrl)
                .build();

        memoRepository.save(memo);

        return memo.getMemoId();
    }

    public List<MemoDto.readMemosResponse> readMemos(String accessToken, MemoType memoType){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        List<MemoDto.readMemosResponse> responses = new ArrayList<>();

        List<Memo> memos = memoRepository.findByTeamAndTypeAndScopeContainingAndFlagFalse(member.getTeam(), memoType, String.valueOf(member.getRole()));

        for(Memo memo : memos){
            responses.add(memo.toReadMemosResponse());
        }

        return responses;
    }

    public int registerComment(String accessToken, CommentDto.WriteComment request){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        Memo memo = memoRepository.findByMemoIdAndFlagFalse(request.getMemoId());
        if(memo == null) throw new CustomException(ErrorCode.NO_EXIST_MEMO);

        Comment comment = Comment.builder()
                .memo(memo)
                .content(request.getContent())
                .build();

        commentRepository.save(comment);

        return memo.getMemoId();
    }

    public void deleteMemo(String accessToken, int memoId){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        Memo memo = memoRepository.findByMemoIdAndFlagFalse(memoId);
        if(memo == null) throw new CustomException(ErrorCode.NO_EXIST_MEMO);

        if(memo.getMember() != member)  throw new CustomException(ErrorCode.NO_AUTHENTICATION);

        memo.shallowDelete();
        memoRepository.save(memo);
    }


}
