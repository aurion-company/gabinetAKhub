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
  // Se já estiver no formato iv:tag:cipher, não criptografar novamente
  if (typeof text === 'string' && text.split(':').length === 3) return text;
  
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
  if (!cipherText || typeof cipherText !== 'string' || !cipherText.includes(':')) return cipherText;
  try {
    const parts = cipherText.split(':');
    if (parts.length !== 3) return cipherText;

    const [ivHex, authTagHex, encryptedText] = parts;
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
 * Helper para criptografar campos sensíveis do eleitor antes de salvar no banco
 */
export function prepareVoterForSave(voterData) {
  return {
    ...voterData,
    cpf: voterData.cpf ? encryptData(voterData.cpf) : null,
    phone: voterData.phone ? encryptData(voterData.phone) : '',
  };
}

/**
 * Helper para descriptografar campos sensíveis do eleitor ao ler do banco
 */
export function prepareVoterForResponse(voter) {
  if (!voter) return voter;
  return {
    ...voter,
    cpf: voter.cpf ? decryptData(voter.cpf) : null,
    phone: voter.phone ? decryptData(voter.phone) : '',
  };
}

/**
 * Gera Hash de Prova Criptográfica HMAC-SHA256 para a Trilha de Auditoria
 */
export function generateAuditHash(action, userId, cabinetId, timestamp) {
  const ts = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const data = `${action}:${userId || 'ANON'}:${cabinetId}:${ts.toISOString()}`;
  return crypto.createHmac('sha256', ENCRYPTION_KEY).update(data).digest('hex');
}

/**
 * Anonimização LGPD para direito ao esquecimento
 */
export function anonymizeVoter(voterName) {
  return `ANONIMIZADO_LGPD_${crypto.randomBytes(4).toString('hex')}`;
}
