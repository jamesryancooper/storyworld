import {
  generateKeyPairSync,
  sign as edSign,
  verify as edVerify,
  createPrivateKey,
  createPublicKey,
  type KeyObject,
} from "node:crypto";

/**
 * Ed25519 detached signatures over canonical package bytes (ADR-0014).
 * Key custody is deployment-specific; this module never persists keys.
 */
export interface SigningKeyPair {
  keyId: string;
  privateKey: KeyObject;
  publicKey: KeyObject;
}

export function generateSigningKeyPair(keyId: string): SigningKeyPair {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  return { keyId, privateKey, publicKey };
}

export function exportPublicKeyPem(pair: SigningKeyPair): string {
  return pair.publicKey.export({ type: "spki", format: "pem" }).toString();
}

export function importKeys(keyId: string, privatePem: string): SigningKeyPair {
  const privateKey = createPrivateKey(privatePem);
  return { keyId, privateKey, publicKey: createPublicKey(privateKey) };
}

export function signDetached(bytes: Uint8Array, pair: SigningKeyPair): Uint8Array {
  return new Uint8Array(edSign(null, bytes, pair.privateKey));
}

export function verifyDetached(
  bytes: Uint8Array,
  signature: Uint8Array,
  publicKeyPem: string,
): boolean {
  return edVerify(null, bytes, createPublicKey(publicKeyPem), signature);
}
