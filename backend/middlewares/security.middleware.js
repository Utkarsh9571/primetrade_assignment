import logger from '../config/logger.js';
import { slidingWindow } from '@arcjet/node';
import aj from '../config/arcjet.js';

const securityMiddleware = async (req, res, next) => {
  try {
    const role = req.user?.role || 'anonymous';

    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: 60,
        name: `${role}-rate-limit`,
      })
    );
    const decision = await client.protect(req);

    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Automated requests are not allowed',
      });
    }

    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by security policy',
      });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Too many requests',
      });
    }

    next();
  } catch (error) {
    logger.error('Arcjet middleware error', error);
    console.error('Arcjet middleware error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong with security middleware',
    });
  }
};

export default securityMiddleware;
