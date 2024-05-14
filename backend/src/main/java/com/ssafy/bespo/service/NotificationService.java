package com.ssafy.bespo.service;

import com.ssafy.bespo.Enum.RoleType;
import com.ssafy.bespo.dto.NotificationDto;
import com.ssafy.bespo.dto.TeamDto;
import com.ssafy.bespo.entity.Member;
import com.ssafy.bespo.entity.Notification;
import com.ssafy.bespo.entity.Team;
import com.ssafy.bespo.exception.CustomException;
import com.ssafy.bespo.exception.ErrorCode;
import com.ssafy.bespo.jwt.AuthTokensGenerator;
import com.ssafy.bespo.repository.MemberRepository;
import com.ssafy.bespo.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final MemberRepository memberRepository;

    public int writeNotification(String accessToken, String imgUrl, NotificationDto.writeNotificationRequest request){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);

        if(member.getRole() == RoleType.Player)
            throw new CustomException(ErrorCode.NO_AUTHENTICATION_FOR_NOTIFICATION);

        Notification notification = Notification.builder()
                .image(imgUrl)
                .text(request.getText())
                .title(request.getTitle())
                .team(member.getTeam())
                .build();

        notificationRepository.save(notification);
        return notification.getNotificationId();
    }

    public List<NotificationDto.readNotificationRequest> getNotificationList(String accessToken){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        List<NotificationDto.readNotificationRequest> responses = new ArrayList<>();
        List<Notification> notifications = notificationRepository.findAllByTeamAndFlagFalseOrderByCreatedDateDesc(member.getTeam());
        for(Notification notification : notifications){
            NotificationDto.readNotificationRequest response = NotificationDto.readNotificationRequest.builder()
                    .notificationId(notification.getNotificationId())
                    .createdAt(notification.getCreateDate())
                    .image(notification.getImage())
                    .modifiedAt(notification.getModifiedDate())
                    .title(notification.getTitle())
                    .team(notification.getTeam().toReadTeam())
                    .text(notification.getText())
                    .writer(member.getName())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public NotificationDto.readNotificationRequest getNotification(String accessToken, int notificationId){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        Notification notification = notificationRepository.findByNotificationIdAndFlagFalse(notificationId);
        if(member.getTeam() != notification.getTeam())  throw new CustomException(ErrorCode.NO_AUTHENTICATION_FOR_NOTIFICATION);
        NotificationDto.readNotificationRequest response = NotificationDto.readNotificationRequest.builder()
                .text(notification.getText())
                .team(notification.getTeam().toReadTeam())
                .title(notification.getTitle())
                .image(notification.getImage())
                .notificationId(notificationId)
                .createdAt(notification.getCreateDate())
                .modifiedAt(notification.getModifiedDate())
                .writer(memberRepository.findByMemberIdAndFlagFalse(notification.getWriterId()).getName())
                .build();
        return response;
    }

    public int modifyNotification(String accessToken, String imgUrl, NotificationDto.modifyNotificationRequest request){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        Notification notification = notificationRepository.findByNotificationIdAndFlagFalse(request.getNotificationId());
        if(notification == null) throw new CustomException(ErrorCode.NO_EXIST_NOTIFICATION);
        if(notification.getWriterId() != memberId)  throw new CustomException(ErrorCode.NO_AUTHENTICATION_DIFFERENT_WRITER);
        notification.updateNotification(request.getTitle(), request.getText(), imgUrl);
        notificationRepository.save(notification);
        return notification.getNotificationId();
    }

    public void deleteNotification(String accessToken, int notificationId){
        int memberId = authTokensGenerator.extractMemberId(accessToken);
        Member member = memberRepository.findByMemberIdAndFlagFalse(memberId);
        if(member == null) throw new CustomException(ErrorCode.NO_EXIST_MEMBER);
        Notification notification = notificationRepository.findByNotificationIdAndFlagFalse(notificationId);
        if(notification == null) throw new CustomException(ErrorCode.NO_EXIST_NOTIFICATION);
        if(notification.getWriterId() != memberId)  throw new CustomException(ErrorCode.NO_AUTHENTICATION_DIFFERENT_WRITER);
        notification.shallowDelete();
    }

}
