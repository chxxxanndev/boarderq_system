// lib/auth.js
import jwt from 'jsonwebtoken';

/**
 * This function extracts the user from the Request Header.
 * Your Login API puts the token in localStorage.
 * Your Navbar/Frontend sends it back in the 'Authorization' header.
 */
export const getCurrentUser = (req) => {
  try {
    // 1. Get the 'Authorization' header from the request
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    // 2. Extract the token string
    const token = authHeader.split(' ')[1];

    // 3. Verify it using your existing JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // This returns { id, email, role } - exactly what your login API saved
    return decoded; 
  } catch (err) {
    // If token is expired or invalid
    return null;
  }
};

// We can leave these empty or mock since your Login API handles the work
export const login = () => { /* Handled by /api/auth/login/route.js */ };
export const logout = () => { /* Handled by Frontend localStorage.clear() */ };