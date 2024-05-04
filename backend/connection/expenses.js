class expensesRouter{

    addExpense(db, req, res) {
        console.log("add expensereq.body: ", req.body);
        let fdata = req.body;
        db.query(`SELECT * FROM TEAM WHERE name ='${fdata.id}'`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("!!!!!!!!!!", data);
            let inside = data.filter(d => d.member !== fdata.host && d.invitation===1)
            console.log("here", inside);
            let amount = Number((fdata.expense/(inside.length+1)).toFixed(2));
            // console.log("expense, length", fdata.expense, inside.length+1);
            // console.log("amount: ", amount);
            let sql1='';
            let cols =[];
            for(let i = 0; i < inside.length; i++){
                let role = false
                console.log(data[i].G_ID, fdata.description, fdata.expense, fdata.date, inside[i].member, amount, role);
                cols = [data[i].G_ID, fdata.description, fdata.expense, fdata.date, inside[i].member, amount, role]
                sql1 = "INSERT INTO EXPENSES (G_ID, description, expense, date, user, amount, role) VALUES (?,?,?,?,?,?,?)";
                db.query(sql1, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                console.log("done with insert expenses");
                let cols2 = [data[i].G_ID, fdata.description, fdata.host, inside[i].member, amount, fdata.date, 'create']
                db.query("INSERT INTO ACTIVITY (G_ID, description, host, user, amount, date, action) VALUES (?,?,?,?,?,?,?)", cols2, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                console.log("done with insert activity");

            }
            let outside = data.filter(d => d.member === fdata.host)
            console.log("outside", outside);
            console.log("this is user amount before", amount);
            amount = 0 - (amount*inside.length)
            console.log("this is user amount after", amount);
            let role = true
            console.log(outside[0].G_ID, fdata.description, fdata.expense, fdata.date, outside[0].member, amount, role);
            cols = [outside[0].G_ID, fdata.description, fdata.expense, fdata.date, outside[0].member, amount, role]
            sql1 = "INSERT INTO EXPENSES (G_ID, description, expense, date, user, amount, role) VALUES (?,?,?,?,?,?,?)";
            db.query(sql1, cols, (err) => {
                if(err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: ''
                    })
                    return;
                }
            })
            console.log("done with insert expenses");

            res.json({
                success: true
            })
            return;
        })
    }


    getExpense(db, req, res) {
        // console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT * FROM EXPENSES WHERE G_ID ='${req.body.ID}'`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            res.status(200).json({success: true, dataset: data, msg: 'Done with getting all expense'})
            console.log("inside getExpenses", data);
            // res.json({
            //     success: true,
            //     dataset: data
            // })
            return;
        })
    }

    getUserInfo(db, req, res) {
        console.log("get user info req.body: ", req.body);
        db.query(`SELECT e1.G_ID,e1.description,e2.amount,e1.user,e2.user,a.username,a.picture FROM expenses AS e1 JOIN expenses AS e2 JOIN account as a ON a.ID= e2.user WHERE e2.role!=1 AND e1.user='${req.body.ID}' AND e1.description=e2.description AND e2.amount > 0 AND e1.amount < 0`, (err, data, fields) => {
            if(err) {
                res.status(401).json({
                    success: false,
                    error: err
                })
                return;
            } 
            console.log("!!!!!!!! afte sql", data);           
            res.status(200).json({
                success: true,
                dataset: data
            })
            return;
        })
    }

    getUserOweInfo(db, req, res) {
        console.log("req.body getuserOweInfo: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT e1.G_ID,e1.description,e1.amount as owe,e1.user as host,e2.user,a.username,a.picture FROM EXPENSES as e1 JOIN EXPENSES  as e2 on e1.description = e2.description JOIN ACCOUNT as a ON a.ID= e2.user WHERE e1.user ='${req.body.ID}' AND e1.amount > 0 AND e2.role != 0`, (err, data, fields) => {
            if(err) {
                res.status(401).json({
                    success: false,
                    error: err
                })
                return;
            }            
            res.status(200).json({
                success: true,
                dataset: data
            })
            return;
        })
    }

    updateExpenses(db, req, res) {
        console.log("updateExpenses req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT e1.G_ID,e1.E_ID,e1.description,e1.amount,e1.user,e2.user as host FROM EXPENSES AS e1 JOIN EXPENSES AS e2 WHERE e2.role=1 AND
        e1.user='${req.body.ID}' AND e1.description = e2.description AND e1.amount > 0`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            // console.log("this is owe", data);
            data.forEach(function(item){
                console.log("this is item", item);
                let cols = [item.G_ID, item.E_ID, item.description, item.host, item.user, item.amount, req.body.date, 'paid']
                console.log(cols);
                let sql1 = "INSERT INTO ACTIVITY (G_ID, E_ID, description, host, user, amount, date, action) VALUES (?,?,?,?,?,?,?,?)";
                db.query(sql1, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                db.query(`UPDATE EXPENSES SET amount = 0 WHERE E_ID='${item.E_ID}'`, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                db.query(`UPDATE EXPENSES SET amount=amount+'${item.amount}' WHERE user='${item.host}' AND description='${item.description}' AND E_ID>0`, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                    console.log("update amount successfully!");
                })
            })
            return;
        })
        db.query(`SELECT e1.E_ID,e1.G_ID,e1.description,e2.amount,e1.user,e2.user,e1.user as host FROM expenses AS e1 JOIN expenses AS e2 JOIN account as a ON a.ID= e2.user WHERE e2.role!=1 AND e1.user='${req.body.ID}' AND e1.description = e2.description AND e1.amount < 0 AND e2.amount > 0`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            // console.log("this is owed", data);

            data.forEach(function(item){
                console.log("this is item", item);
                let cols = [item.G_ID, item.E_ID, item.description, item.host, item.user, item.amount, req.body.date, 'paid']
                console.log(cols);
                let sql1 = "INSERT INTO ACTIVITY (G_ID, E_ID, description, host, user, amount, date, action) VALUES (?,?,?,?,?,?,?,?)";
                db.query(sql1, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                db.query(`UPDATE EXPENSES SET amount = 0 WHERE user='${item.user}' AND description='${item.description}'`, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                db.query(`UPDATE EXPENSES SET amount = 0 WHERE E_ID='${item.E_ID}'`, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
            })
            res.json({
                success: true,
                dataset: data
            })
            return;
        })
    }

    calculate(db, req, res) {
        console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT e.user,SUM(amount) as total,t.rejection,a.picture,a.username FROM EXPENSES as e JOIN ACCOUNT as a ON e.user=a.ID JOIN TEAM as t ON t.member=e.user and t.G_ID=e.G_ID WHERE e.G_ID='${req.body.id}' and t.rejection != 1 GROUP BY user,rejection`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            // console.log("this is owe", data);
            res.json({
                success: true,
                dataset: data
            })
            return;
        })
    }
}
module.exports = expensesRouter;
