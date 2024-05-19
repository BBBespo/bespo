export interface TeamProps {
  teamImg: string;
  teamName: string;
  createDate: string;
  memberCount: number;
}
export type Memo = {
  createdDate: string;
  modifiedDate: string;
  flag: boolean;
  memoId: number;
  name: string;
  content: string;
  type: string;
  scope: string;
  comments: any[];
  createDate: string;
};
export type Injury = {
  createdDate: string;
  modifiedDate: string;
  flag: boolean;
  injuryId: number;
  injuryArea: string;
  injuryLevel: number;
  injuryCause: string;
  contact: boolean;
  createDate: string;
};
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
  injurys: Injury[];
  memos: Memo[];
  oauthProvider: string;
  createDate: string;
};
