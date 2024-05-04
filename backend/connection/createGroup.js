const db = require('../connection/db');

const createGroup = async (req, res) => {
    try {
        console.log("createGroup");
        sql = `SELECT ID FROM ACCOUNT WHERE email = '${req.body.emailID}'`;
        file_path =  'http://localhost:9000/user_pic/';
        picture_path = ''
        db.query(sql, (err, data) => {
            console.log(data);
            picture_path = file_path + data[0].ID + '/';
            let fdata = req.body;
            console.log("this is fdata", fdata);
            let cols = [fdata.username, fdata.email, fdata.phone, picture_path, fdata.currency, fdata.time, fdata.language, fdata.emailID];
            let sql2 = "UPDATE ACCOUNT SET username = ?, email = ?," +
                        "phone = ?, picture = ?, currency = ?, time = ?," +
                        "language = ? WHERE email = ?";
            db.query(sql2, cols, (err) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
                }
            })

            res.json({
                success: true
            });
                return;
            });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

module.exports = {
  createGroup
};