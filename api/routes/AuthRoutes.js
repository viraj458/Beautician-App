module.exports = function (app) {
    const {registerUser, loginUser} = require('../controllers/AuthController')

    app.post('/register', registerUser)
    app.post('/login', loginUser)


}