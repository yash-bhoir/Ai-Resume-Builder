
import { generateAccessAndRefreshTokens} from "../controllers/user.controller.js";
const loadAuth = (req, res) => {
    res.render('auth');
}


const successGoogleLogin = async (req, res) => {
  if (!req.user) {
    return res.redirect('/failure');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(req.user.id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .redirect('/success');
};


const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}

export {
    loadAuth,
    successGoogleLogin,
    failureGoogleLogin
}