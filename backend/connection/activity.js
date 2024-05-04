class getActivityRouter{


    // getGroup(db, req, res) {
    //     let groupNum = []
    //     db.query(`SELECT * FROM TEAM WHERE FIND_IN_SET('${req.body.id}',member)`, (err, data, fields) => {
    //         if(err) {
    //             console.log(err);
    //             res.json({
    //                 success: false,
    //                 msg: ''
    //             })
    //             return;
    //         }
    //         console.log("get data", data);
    //         for(let g in data){
    //             groupNum.push({
    //                 id: data[g].G_ID,
    //                 name: data[g].name,
    //                 picture: data[g].picture,
    //                 member: data[g].member,
    //                 invitation: data[g].invitation,
    //                 rejection: data[g].rejection
    //             })
    //         }
    //         res.json({
    //             success: true,
    //             dataset: groupNum
    //         })
    //         return;
    //     });

    // }

    allActivity(db, req, res) {
        console.log("inside allActivity", req.body);
        db.query(`SELECT ay.*,ac2.username as hostname, ac1.username as username,ac2.picture as hostpic,ac1.picture as userpic FROM ACTIVITY as ay JOIN ACCOUNT as ac1 on ay.user=ac1.ID JOIN ACCOUNT as ac2 on ay.host=ac2.ID where G_ID in (SELECT G_ID FROM TEAM WHERE member='${req.body.ID}')`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("all activity", data);
            res.json({
                success: true,
                dataset: data
            });
            return;
        });
    }

    // accpet(db, req, res) {
    //     console.log("!!!!!inside accpet");
    //     db.query(`UPDATE TEAM SET invitation=true WHERE name="${req.body.name}" AND member=${req.body.user}`, (err, data, fields) => {
    //         if(err) {
    //             console.log(err);
    //             res.json({
    //                 success: false,
    //                 msg: ''
    //             })
    //             return;
    //         }
    //         res.json({
    //             success: true,
    //             dataset: data
    //         });
    //         console.log("update successfully");
    //         return;
    //     });
    // }

    // reject(db, req, res) {
    //     console.log("!!!!!inside reject");
    //     db.query(`UPDATE TEAM SET rejection=true WHERE G_ID="${req.body.id}" AND member=${req.body.member}`, (err, data, fields) => {
    //         if(err) {
    //             console.log(err);
    //             res.json({
    //                 success: false,
    //                 msg: ''
    //             })
    //             return;
    //         }
    //         res.json({
    //             success: true,
    //             dataset: data
    //         });
    //         console.log("update successfully");
    //         return;
    //     });
    // }

    // leaveGroup(db, req, res) {
    //     console.log("!!!!!inside leave");
    //     db.query(`UPDATE TEAM SET rejection=true WHERE name="${req.body.name}" AND member=${req.body.user}`, (err, data, fields) => {
    //         if(err) {
    //             console.log(err);
    //             res.json({
    //                 success: false,
    //                 msg: ''
    //             })
    //             return;
    //         }
    //         res.json({
    //             success: true,
    //             dataset: data
    //         });
    //         console.log("reject successfully");
    //         return;
    //     });
    // }
}
module.exports = getActivityRouter;
