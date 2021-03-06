const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req,res) => {
    const {username, password} = req.body;
    try {
        const hashpassword = await bcrypt.hash(password, 12);
        const new_user = await User.create({username, password:hashpassword});
        res.status(200).json({
            status : 'success',
            data : {
                user : new_user
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail",
        })
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (isCorrect) {
            req.session.user = user;
            res.status(200).json({
                status: 'success'
            })
        } else{
            res.status(400).json({
                status: 'fail',
                message : 'incorrect username or password'
            });
        }

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail",
        })
    }
}
