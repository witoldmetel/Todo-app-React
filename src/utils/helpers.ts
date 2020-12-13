import { format, formatDistanceToNow } from 'date-fns';

export const formatTime = (time: Date) => format(time.toDate(), 'dd.MM.yyyy H:mm');
export const formatTimeFromNow = (time: Date) => formatDistanceToNow(time.toDate(), { addSuffix: true });

export const getAvatarImage = (id: string) => `https://api.hello-avatar.com/adorables/avatars/${id}.png`;
