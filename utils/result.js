const messages = [
    {code: 0, message: ""},
    {code: 1, message: "Access Denied"},
    {code: 2, message: "Invalid Token"},
    {code: 3, message: "User not found"},
    {code: 4, message: "Email already exists"},
    {code: 5, message: "Email is not found"},
    {code: 6, message: "Invalid password"},
]

module.exports = (payload = {}, code = 0, message = "") => ({code, payload, message: (message) ? message : messages.find(n => n.code === code).message})



