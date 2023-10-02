import { selector } from 'recoil';
import { UserState } from '../atoms/user';

export const UserEmail = selector({
  key: 'userEmail',
  get: ({ get }) => {
    const state = get(UserState);
    return state.userEmail;
  },
});

export const UserPurchasedCourses = selector({
  key: 'userPurchasedCourses',
  get: ({ get }) => {
    const state = get(UserState);
    return state.purchasedCourses;
  },
});

export const UserCart = selector({
  key: 'userCart',
  get: ({ get }) => {
    const state = get(UserState);
    return state.cart;
  },
});
