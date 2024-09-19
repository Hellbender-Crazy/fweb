const router = require('express').Router()

router.delete('/', async (req, res) => {
    try {
      const refreshToken = getTokenFromHeader(req.headers)

      if (refreshToken){
        await Token.finOneAndRemove({ token: refreshToken })
        res.status(200).json(jsonResponse(200, { message: "Token deleted" }))
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(jsonResponse(500, { error: "Server error" }))
    }
})

module.exports = router;
