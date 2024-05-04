const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class signupRouter {

    async execSQL(db, sql) {
        console.log('sql :', sql);
        return new Promise((resolve, reject) => {
            db.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows);
                }
            })
        })
    }

    async findOne(db, sql) {
        const list = await this.execSQL(db, sql);
        return list.length > 0 ? list[0] : null;
    }
    async beginTran(db) {
        return new Promise((resolve, reject) => {
            db.beginTransaction((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        })
    }
    async register(db, req, res) {
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.psswd, 9);
        let email = req.body.email;
        let phone = req.body.phone || '';
        let sql = `SELECT * FROM ACCOUNT WHERE username = '${username}'`;

        try {
            let userInfo = await this.findOne(db, sql);
            if (userInfo) {                // judge email is exists;
                res.status(400).json({msg: 'Username already exists, please try another one'})
                return;
            }
            sql = `SELECT * FROM ACCOUNT WHERE Email ='${email}'`;
            userInfo = await this.findOne(db, sql);
            if (userInfo) {                // judge email is exists;
                res.status(400).json({msg: 'Email already exists, please try another one'})
                return;
            }

            await this.beginTran(db);
            // save user infomation to account
            // const picture = 'http://localhost:9000/user_pic/0/profile.png'
            sql = `insert into ACCOUNT(username, email, psswd, phone) values ('${username}','${email}', '${password}', '${phone}')`;
            const data = await this.execSQL(db, sql);
            db.commit();//                                            commit transaction
            console.log("data!!!!!!", data);
            if (data) {                // judge email is exists;
                res.status(200).json({user: username, msg: 'register success'})
                return;
            }
            // res.json({ success: true, msg: 'register success' })
        } catch (ex) {
            db.rollback();//                                          rollback transaction
            console.log('sql rollback')
            console.log(ex);
            res.status(400).json({error: 'Error, please try again'})
            return;
        }
    }
}
module.exports = signupRouter;