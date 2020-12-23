import firebase from 'firebase';

import { formatTime, formatTimeFromNow, getAvatarImage } from './helpers';

describe('Time format', () => {
  it('formatTime method display correct date', () => {
    const inputDate = { seconds: 1608720273, nanoseconds: 203000000 };
    const firebaseTimestamp = new firebase.firestore.Timestamp(inputDate.seconds, inputDate.nanoseconds);

    const formatDate = formatTime(firebaseTimestamp);
    const result = '23.12.2020 11:44';

    expect(result).toEqual(formatDate);
  });

  it('formatTimeFromNow method display correct status', () => {
    const inputDate = { seconds: 16720273, nanoseconds: 2000000 };
    const firebaseTimestamp = new firebase.firestore.Timestamp(inputDate.seconds, inputDate.nanoseconds);

    const formatStatus = formatTimeFromNow(firebaseTimestamp);
    const result = 'over 50 years ago';

    expect(result).toEqual(formatStatus);
  });
});

describe('getAvatarImage', () => {
  it('return avatar', () => {
    const getAvatar = getAvatarImage('firebase');
    const result = 'https://api.hello-avatar.com/adorables/avatars/firebase.png';

    expect(result).toEqual(getAvatar);
  });
});
