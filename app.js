const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

let port = 8000

// its for jwt
let screetKey = 'screet'

app.get('/api', (req, res) => {
   res.json({
       message : "Welcome gaes"
   });
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, screetKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message : "post ini ya gaess...",
                authData: authData
            })
        }
    } )
    
});

app.post('/api/login', (req, res) => {
    // user static
    const user = {
        id: 1,
        username: "alifmaheaven",
        email: 'alifmaheven2001@gmail.com' 
    }

    jwt.sign({user}, screetKey,{expiresIn: '30s'},(err, token) => {
         res.json({
             token: token
         });
    })
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// verify token
function verifyToken(req, res, next) {
    // Get header value
    const bearerHeader = req.headers['authorization']
    // check if bearer undifine
    if (typeof bearerHeader !== 'undefined') {
        // split the token at space of barier
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next middleware
        next()
    } else {
        //forbiden
        res.sendStatus(403);
    }

}

app.listen(port, () => {
    console.log(`Server started on port`);
});

