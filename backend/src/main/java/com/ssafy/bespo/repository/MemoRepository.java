package com.ssafy.bespo.repository;

import com.ssafy.bespo.Enum.MemoType;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Memo;
import com.ssafy.bespo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Integer> {

    Memo findByMemoIdAndFlagFalse(int memoId);
    List<Memo> findByTeamAndTypeAndFlagFalse(Team team, MemoType type);
    List<Memo> findByTeamAndTypeAndScopeContainingAndFlagFalseOrderByCreatedDateDesc(Team team, MemoType type, String scope);
    List<Memo> findByTeamAndScopeContainingAndFlagFalseOrderByCreatedDateDesc(Team team, String scope);
    List<Memo> findByMemberAndFlagFalseOrderByCreatedDateDesc(Member member);

    List<Memo> findByMemberAndFlagFalse(Member member);
    List<Memo> findByTeamAndFlagFalse(Team team);
}
