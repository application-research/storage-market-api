import AES from 'aes-js';

export function parseAuthKey(headers) {
  if (headers && headers.authorization) {
    const parts = headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
  }
  return null;
}

export function generateKeyFromUser(user) {
  const text = `${user.username} ${user.password}`;
  return encrypt(text);
}

export function getUsernameAndHashFromKey({ key }) {
  try {
    const info = decrypt(key);
    const splitInfo = info.split(' ');

    return { username: splitInfo[0], password: splitInfo[1], success: true };
  } catch (e) {
    return null;
  }
}

export function encrypt(text) {
  try {
    const key = JSON.parse(process.env.PRODUCTION_ENCRYPTION_SECRET);
    const counter = new AES.Counter(3);
    const textBytes = AES.utils.utf8.toBytes(text);
    const AESCTR = new AES.ModeOfOperation.ctr(key, counter);
    const encryptedBytes = AESCTR.encrypt(textBytes);
    return AES.utils.hex.fromBytes(encryptedBytes);
  } catch (e) {
    return null;
  }
}

export function decrypt(text) {
  try {
    const encryptionKey = JSON.parse(process.env.PRODUCTION_ENCRYPTION_SECRET);
    const encryptedBytes = AES.utils.hex.toBytes(text);
    const AESCTR = new AES.ModeOfOperation.ctr(encryptionKey, new AES.Counter(3));
    const decryptedBytes = AESCTR.decrypt(encryptedBytes);
    return AES.utils.utf8.fromBytes(decryptedBytes);
  } catch (e) {
    return null;
  }
}
