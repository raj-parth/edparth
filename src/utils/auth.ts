// Secure Admin Authentication Service
// Evaluates credentials via SHA-256 hash or environment variable without exposing plaintext passcodes

const ADMIN_EMAIL = 'parthverse0@gmail.com';
const ADMIN_PASSCODE_SHA256 = '58c882dbc13be6f9feabb8fcedae2229fc1bbb5c7e6ab254e4112ad2e87dad11';

export async function verifyAdminCredentials(email: string, passcode: string): Promise<boolean> {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPasscode = passcode.trim();

  if (trimmedEmail !== ADMIN_EMAIL) {
    return false;
  }

  // 1. Check custom environment override if set
  const envPasscode = import.meta.env.VITE_ADMIN_PASSCODE;
  if (envPasscode && trimmedPasscode === envPasscode) {
    return true;
  }

  // 2. Web Crypto SHA-256 hash comparison
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(trimmedPasscode);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === ADMIN_PASSCODE_SHA256;
  } catch {
    return false;
  }
}
