export function logger(req, res, next) {
  console.log(new Date().toLocaleTimeString(), req.method, req.originalUrl);
  next();
}
