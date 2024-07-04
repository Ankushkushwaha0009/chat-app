import jwt from "jsonwebtoken" ; 
const generateTokenAndSetCookie = (userId, res) => {
  // sending payload , some secret , expires in
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt" , token , {
    // Maxium age for cookie leave
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF ATTACKS CROSS - SITE REQUEST FORGERY ATTACKS
    secure: process.env.NODE_ENV !== "development",
  });
};
export default generateTokenAndSetCookie ;