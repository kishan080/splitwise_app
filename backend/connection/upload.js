const multer = require("multer");
const db = require('../connection/db');
var fs = require('fs');
const e = require("express");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        f_path = '';
        sql = '';
        console.log("upload!!");
        console.log("!req.body!", req.body);
        
        if(req.body.upload === 'group'){
            if(req.body.update === 'update'){
                sql = `SELECT G_ID AS ID FROM team WHERE G_ID='${req.body.id}'`;
            }else{
                sql = 'SELECT max(G_ID) as ID FROM Team';
            }
            f_path =  'public/group/';
        } else{
            f_path =  'public/user/';
            sql = `SELECT ID FROM ACCOUNT WHERE email = '${req.body.email}'`;
        }
        db.query(sql, (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            if(data === null){
                pic_path = f_path + '1/';
                !fs.existsSync(pic_path) && fs.mkdirSync(pic_path);
                cb(null, pic_path);
                }
            else{
                let dataLine;
                if(req.body.upload === 'group' && req.body.update !== 'update')
                    dataLine = data[0].ID + 1
                else
                    dataLine = data[0].ID
                pic_path = f_path + dataLine + '/';
                // f_num = data[0].ID+1;
                !fs.existsSync(pic_path) && fs.mkdirSync(pic_path);
                cb(null, pic_path);
            }

        });
    },

    filename: function(req, file, cb) {
        cb(null, 'profile.png');
    }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;