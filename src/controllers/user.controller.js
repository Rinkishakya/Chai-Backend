import asynHandler from "../utils/asynHandler.js";


const registerUser = asynHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    });
});

const login = asynHandler(async (req, res) => {
  res.status(200).json({
    message: "Login successfully"
  });
});


export default { 
    registerUser, 
    login 
};

// export default registerUser;
