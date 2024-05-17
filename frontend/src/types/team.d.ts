export interface TeamProps {
  teamImg: string;
  teamName: string;
  createDate: string;
  memberCount: number;
}

export type Member = {
  createdDate: string;
  modifiedDate: string;
  flag: boolean;
  memberId: number;
  email: string;
  name: string;
  role: string;
  roleName: string;
  weight: number;
  height: number;
  birth: string;
  tel: string;
  backNumber: number;
  imgUrl: string;
  statuses: any[];
  trainings: any[];
  injurys: any[];
  memos: any[];
  oauthProvider: string;
  createDate: string;
};
