const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

class getUserRouter{

    getUser(db, req, res) {
        console.log("get user!!!!!!!");
        db.query(`SELECT ID, username, email, phone, picture, currency, time, language FROM ACCOUNT WHERE email = '${req.body.email}'`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("inside");
            console.log(data);
            res.json({
                success: true,
                dataset: data
            });
            return;
        });

    }

    allUser(db, req, res) {
        console.log("!!!!!!!searchUser");
        db.query('SELECT * FROM ACCOUNT', (err, data, fields) => {
            if(err) {
                console.log(err);
                res.status(401).json({errors: "errors hapended"})
                // res.json({
                //     success: false,
                //     msg: ''
                // })
                return;
            }
            res.status(200).json({dataset: data})
            return;
        });
    }

    updateUser(db, req, res) {
        let fdata = req.body;
        upload.single(fdata.picture)
        let cols = [fdata.username, fdata.email, fdata.phone, fdata.picture, fdata.currency, fdata.time, fdata.language, fdata.emailID];
        let sql = "UPDATE ACCOUNT SET username = ?, email = ?," +
                    "phone = ?, picture = ?, currency = ?, time = ?," +
                    "language = ? WHERE email = ?";
        //console.log(cols);
        db.query(sql, cols, (err) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }
            //console.log(data);
            res.json({
                success: true
            });
            return;
        });
    }

    getDashboardInfo(db, req, res) {
        console.log(req.params.id);
        console.log("!!!!!!!searchUser");
        db.query(`SELECT * FROM ACCOUNT WHERE ID=${req.params.id}`, (err, data, fields) => {
            if(err) {
                // console.log(err);
                res.status(401).json({errors: "errors hapended"})
                return;
            }
            if(data.length === 0)
                res.status(402).json({errors: "ID dosen't exist!"})
            if(data.length > 0){
                console.log("data", data);
                res.status(200).json({dataset: data})
                return;
            }
        });
    }
}
module.exports = getUserRouter;
