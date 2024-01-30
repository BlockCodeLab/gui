const soup = 'abcdefghijklmnopqrstuvwxyz_0123456789';

export default function (length = 20) {
  const id = [];
  for (let i = 0; i < length; i++) {
    const soupLength = i > 0 ? soup.length : soup.length - 11;
    id[i] = soup.charAt(Math.random() * soupLength);
  }
  return id.join('');
}
