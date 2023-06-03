var { expressjwt: jwtk } = require("express-jwt");

exports.isSignedIn = jwtk(
    {
        secret: process.env.SECRET,
        userProperty: "auth1",
        algorithms: ['sha1', 'HS256', 'RS256']
})

exports.isAuthenticated = (req, res, next) => {
    try {
        console.log(req.profile._id.toString())
        console.log("req auth is", req.auth)
        console.log("req profile is", req.profile)
        let checker = req.profile && req.auth &&
            req.profile._id.toString() === req.auth._id
        if (!checker) {
            return res.status(403).json({
                error: "Acess is denied"
            })
        }
        next()
    } catch (er) {
        console.log("error", er)
    }
}