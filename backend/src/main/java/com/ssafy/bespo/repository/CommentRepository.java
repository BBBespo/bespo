package com.ssafy.bespo.repository;

import com.ssafy.bespo.entity.Comment;
import com.ssafy.bespo.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findCommentsByMemoAndFlagFalseOrderByCreatedDate(Memo memo);
}
