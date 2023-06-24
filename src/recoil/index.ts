import {atom} from 'recoil';
import { UserT, UserAccess } from '../types';

export const activeTabAtom = atom({
  key: 'activeTab',
  default: 0,
});

export const userAtom = atom<UserT>({
  key: 'user',
  default: {
    openID: '',
    nickName: '',
    avatarUrl: '',
    userAccess: UserAccess.User,
  },
});