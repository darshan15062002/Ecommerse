const sendToken = (user, res, statusCode) => {
    const token = user.getJWTToken()
    //options for cookies
    const options = {
        expire: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true

    }
    res.status(statusCode).cookie('accessToken', token, options).json({
        success: true,
        user,
        token
    })

}
module.exports = sendToken