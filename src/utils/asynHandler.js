const asynHandler = (requestHandler) => {
 return (req, res, next) => {
       
           Promise.resolve( requestHandler(req, res, next)).
         catch ((err) => next(err));  
          
   }
}

export default asynHandler;

// 2nd approach
// const asynHandler = () => {}
// const asynHandler = (func) => () => {}
// const asynHandler = (func) =>async() => {}
  // }
//}


// 2nd approach
// const asynHandeler = () => {}
// const asynHandeler = (func) => () => {}
// const asynHandeler = (func) =>async() => {}


// const asynHandeler = (func) => async(req,res,next) => {
//     try {
//         await func(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//         });
//     }
// }