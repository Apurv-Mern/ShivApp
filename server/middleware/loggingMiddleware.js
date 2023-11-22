

function loggingMiddleware(req, res, next) {
    // Get the current timestamp
    const timestamp = new Date().toISOString();
  
    // Log the incoming request details
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
    next();
  }
  
  module.exports = loggingMiddleware;
  