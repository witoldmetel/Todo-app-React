import { format, formatDistanceToNow } from 'date-fns';

export const formatTime = (time: firebase.firestore.Timestamp) => format(time.toDate(), 'dd.MM.yyyy H:mm');
export const formatTimeFromNow = (time: firebase.firestore.Timestamp) =>
  formatDistanceToNow(time.toDate(), { addSuffix: true });

export const getAvatarImage = (id: string) => `https://api.hello-avatar.com/adorables/avatars/${id}.png`;
