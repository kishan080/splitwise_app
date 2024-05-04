const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./db');
const configer = {jwtSecret: "fdashfjhdgksajkghkfndasndjvbiahiufe"}
//const tokenVerifier = require('./tokenVerifier');

class loginRouter{
        login(db, req, res) {
        let email = req.body.email;
        let password = req.body.psswd;
        
        let cols = [email];
        db.query('SELECT * FROM ACCOUNT WHERE email = ?', cols, (err, data, fields) => {

            if(err) {
                console.log(err);
                // res.json({
                //     success: false,
                //     msg: 'Invalid email, please try again'
                // })
                res.status(401).json({errors: { form: "Invalid Credentials"}})
                return;
            }
            console.log(data);
            // Found 1 user with this username
            if(data && data.length === 1) {
                console.log(data[0].ID);
                bcrypt.compare(password, data[0].psswd, (bcryptErr, verified) => { 
                    if(verified) {
                        console.log("this is data[0]", data[0])
                        // res.status(200).json({
                        //     ID: data[0].ID,
                        //     email: data[0].email,
                        //     username: data[0].username,
                        //     success: true,
                        // });
                        const token = jwt.sign({
                            ID: data[0].ID,
                            email: data[0].email,
                            username: data[0].username,
                            success: true
                        }, configer.jwtSecret)
                        res.json({token})
                        return;
                    }
                    if(bcryptErr){
                        console.log(bcryptErr);
                    }

                    else {
                        // res.json({
                        //     success: false,
                        //     msg: 'Invalid password'
                        // })
                        res.status(401).json({errors: { form: "Invalid password/username"}})

                    }
                });
            }

            else {
                // res.json({
                //     success: false,
                //     msg: 'please try again'
                // })
                res.status(401).json({errors: { form: "please try again"}})
            }

        });

    }
}
module.exports = loginRouter;
