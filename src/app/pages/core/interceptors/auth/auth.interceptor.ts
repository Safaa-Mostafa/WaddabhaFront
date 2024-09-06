import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Attempt to parse the token if needed, assuming it's stored as a string
        // If the token is a JWT, it may not need parsing
        // Adjust according to your token format
        const parsedToken = JSON.parse(token);

        // Assuming the token is valid if parsing succeeds
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${parsedToken}`
          }
        });
      } catch (e) {
        console.error('Error parsing token from localStorage:', e);

        // Optionally handle the error, such as removing an invalid token from localStorage
        localStorage.removeItem('token');

        // You might want to add logic to handle requests when the token is invalid
      }
    }
    // No token found; request proceeds without Authorization header
  }

  return next(req);
};
