const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
  cache: true,
  cacheMaxAge: 600000,   // cache public keys for 10 minutes
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Verify token and attach decoded user to req.user
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    getKey,
    {
      audience: process.env.KEYCLOAK_CLIENT_ID,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token', detail: err.message });
      }
      req.user = decoded;
      next();
    }
  );
};

// Optional: role-based guard
// Usage: router.post('/', authenticate, requireRole('admin'), ctrl.create)
const requireRole = (role) => (req, res, next) => {
  const roles =
    req.user?.realm_access?.roles ||
    req.user?.resource_access?.[process.env.KEYCLOAK_CLIENT_ID]?.roles ||
    [];

  if (!roles.includes(role)) {
    return res.status(403).json({ error: `Role '${role}' required` });
  }
  next();
};

module.exports = { authenticate, requireRole };