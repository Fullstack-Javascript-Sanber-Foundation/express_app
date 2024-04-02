const errorHandler = (err, req, res, next) => {
    let statusCode;
    let message;
    console.log(err.message)

    switch (err.message){
        case "Mising_Token":
            statusCode = 401
            message = "Missing access token 2";
            break;
        case "User_not_registered":
            statusCode = 401
            message = "User not registered";
            break;
        default: 
            code = 500
            message = "Internal server error"
            break
    }

    return res.status(statusCode).json({
        success: false,
        message
    })
}

export default errorHandler