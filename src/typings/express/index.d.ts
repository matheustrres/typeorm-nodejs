declare namespace Express {
  export interface Request {
    profileId: string;
    profileAccountType: string;
    profileStudentId?: string;
  }
}