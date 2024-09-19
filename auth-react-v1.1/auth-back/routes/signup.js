const router = require("express").Router();
const { jsonResponse } = require('../lib/jsonResponse')
const User = require("../schema/user")

router.post("/", async(req, res) => {
    const { username, name, password } = req.body

    if(!!!username || !!!name || !!!password) {
      return res.status(400).json(
        jsonResponse(400, {
          error: 'Fields are required'
        })
      )
    }

    //crear usuario en BD
try {
  const user = new User()
  const exist = await user.usernameExist(username)

  if(exist) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Username alreade exist"
      })
    )
  }

  const newUser = new User({ username, name, password})

  await newUser.save()

  res.status(200)
  .json(jsonResponse(200, {message: 'User created sucessfully'}))

  res.send("signout")
} catch (err) {
  res.status(500).json (
    jsonResponse(500, {
      error: "Error creating user",
    })
  )
  }
 })

module.exports = router;
