import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
  ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex') 
  : crypto.scryptSync('chave_militar_mestre_gp360_2026', 'salt_militar_2026', 32);

/**
 * Criptografia AES-256-GCM de Padrão Militar para Dados Sensíveis (CPF, Telefone)
 */
export function encryptData(text) {
  if (!text) return text;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toBuffer().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Descriptografia AES-256-GCM de Padrão Militar
 */
export function decryptData(cipherText) {
  if (!cipherText || !cipherText.includes(':')) return cipherText;
  try {
    const [ivHex, authTagHex, encryptedText] = cipherText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    return '[DADO PROTEGIDO/MILITAR]';
  }
}

/**
 * Gera Hash de Prova Criptográfica HMAC-SHA256 para a Trilha de Auditoria
 */
export function generateAuditHash(action, userId, cabinetId, timestamp) {
  const data = `${action}:${userId || 'ANON'}:${cabinetId}:${timestamp.toISOString()}`;
  return crypto.createHmac('sha256', ENCRYPTION_KEY).update(data).digest('hex');
}

/**
 * Anonimização LGPD para direito ao esquecimento
 */
export function anonymizeVoter(voterName) {
  return `ANONIMIZADO_LGPD_${crypto.randomBytes(4).toString('hex')}`;
}
