export interface InviteCodeStoreType {
  code: string;
  isOwner: boolean;
  setInviteCode: (code: string) => void;
  setIsOwner: (state: boolean) => void;
}
