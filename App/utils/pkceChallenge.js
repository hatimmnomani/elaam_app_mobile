import { encode as base64encode } from 'base64-arraybuffer';

/**
 * Pure JS SHA256 implementation (compatible with React Native)
 * Source: https://github.com/emn178/js-sha256
 */
function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j;
  var result = '';

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  var hash = (sha256.h = sha256.h || []);
  var k = (sha256.k = sha256.k || []);
  var primeCounter = k[lengthProperty];

  if (!primeCounter) {
    var isPrime = {};
    var n = 2;
    while (primeCounter < 64) {
      if (!isPrime[n]) {
        for (i = 0; i < 313; i += n) {
          isPrime[i] = n;
        }
        hash[primeCounter] = (mathPow(n, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(n, 1 / 3) * maxWord) | 0;
      }
      n++;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return; // ASCII check
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    var w = words.slice(j, (j += 16));
    var oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      var w15 = w[i - 15],
        w2 = w[i - 2],
        a = hash[0],
        e = hash[4],
        temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
      var temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

/**
 * Helper: Convert hex to byte array
 */
function hexToUint8Array(hexString) {
  const result = [];
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return new Uint8Array(result);
}

/**
 * Base64URL encode utility
 */
function base64UrlEncode(buffer) {
  return base64encode(buffer)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Pure JS random bytes (no native dependency)
 */
function getPseudoRandomBytes(size) {
  const result = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = Math.floor(Math.random() * 256);
  }
  return result;
}

/**
 * Generate PKCE Verifier + Challenge (no native crypto)
 */
export async function pkceChallenge() {
  // 1️Generate random 32-byte verifier
  const randomBuffer = getPseudoRandomBytes(32);
  const codeVerifier = base64UrlEncode(randomBuffer);

  // 2️Hash it using SHA256
  const hashHex = sha256(codeVerifier);
  const hashBytes = hexToUint8Array(hashHex);
  const codeChallenge = base64UrlEncode(hashBytes);

  return { codeVerifier, codeChallenge };
}
