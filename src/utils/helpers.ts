import { format, formatDistanceToNow } from 'date-fns';

// @todo: Add typing
export const formatTime = (time) => format(time.toDate(), 'dd.MM.yyyy H:mm');
export const formatTimeFromNow = (time) => formatDistanceToNow(time.toDate(), { addSuffix: true });

export const getAvatarImage = (id: string) => `https://api.hello-avatar.com/adorables/avatars/${id}.png`;
