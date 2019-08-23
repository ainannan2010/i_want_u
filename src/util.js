export function getRedirectPath({ type, avatar }) {
  let url = type === 'boss' ? '/boss' : '/genius';

  if (!avatar) {
    url += 'Info';
  }

  return url;
}

export function getChatId(userid, targetid) {
  return [userid, targetid].sort().join('_');
}