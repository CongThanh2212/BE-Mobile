const Account = require('../model/account')
const RequireCreate = require('../model/requireCreate')
const Verification = require('../model/verification')
const nodemailer = require('nodemailer')
const otplib = require('otplib')
const randomstring = require('randomstring')

class AccountCtl {

    // Send require create account
    async requireCreate(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        if (!email || !password || !name) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        const findAcc = await Account.findOne({email: email});
        if (findAcc) return res.json({success: false, mess: 'Email đã đăng ký'});

        try {
            const mailServer = 'systemvct@gmail.com';
            const token = otplib.totp.generate(randomstring.generate());

            var transporter =  nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: mailServer,
                    pass: 'rgivjbxyihvfqeyh'
                }
            });
            var content = 'Đây là mã OTP: ' + token;
            var options = {
                from: `Emma <${mailServer}>`,
                to: email,
                subject: 'Mã OTP',
                text: content
            }
            await transporter.sendMail(options);
            
            const find = await RequireCreate.findOneAndUpdate({email: email}, {
                password: hash(password),
                name: name,
                otp: token
            })
            if (!find) {
                await new RequireCreate({
                    email: email,
                    password: hash(password),
                    name: name,
                    otp: token
                }).save();
            }
            
            return res.json({success: true});
        } catch (error) {
            return res.json({success: false, mess: "Lỗi"});
        }
    }

    // Verification OTP and create account
    async create(req, res) {
        const otp = req.body.otp;

        if (!otp) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const require = await RequireCreate.findOne({otp: otp});
            if (!require) return res.json({success: false, mess: 'Mã OTP không chính xác'});

            await new Account({
                email: require.email,
                password: require.password,
                name: require.name
            }).save();

            await RequireCreate.deleteOne({otp: otp});

            return res.json({
                success: true,
                email: require.email,
                name: require.name
            });
        } catch (error) {
            return res.json({success: false});
        }
    }

    // Send mail change password
    async sendMail(req, res) {
        const email = req.body.email;

        if (!email) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});
        const findAccount = await Account.findOne({email: email});
        if (!findAccount) return res.json({success: false, mess: 'Email chưa đăng ký'});

        try {
            const mailServer = 'systemvct@gmail.com';
            const token = otplib.totp.generate(randomstring.generate());

            var transporter =  nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: mailServer,
                    pass: 'rgivjbxyihvfqeyh'
                }
            });
            var content = 'Đây là mã OTP: ' + token;
            var options = {
                from: `Emma <${mailServer}>`,
                to: email,
                subject: 'Mã OTP',
                text: content
            }
            await transporter.sendMail(options);

            const find = await Verification.findOneAndUpdate({email: email}, {otp: token});
            if (!find) {
                await new Verification({
                    email: email,
                    otp: token
                }).save();
            }

            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    // Verification OTP change password
    async verification(req, res) {
        const otp = req.query.otp;

        try {
            const findOTP = await Verification.findOne({otp: otp});
            if (!findOTP) return res.json({success: false, mess: 'Mã OTP không chính xác'});

            await Verification.deleteOne({otp: otp});

            return res.json({success: true});
        } catch (error) {
            return res.json({success: false, mess: 'Lỗi'});
        }
    }

    async changeInfo(req, res) {
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const newName = req.body.newName;

        try {
            var account;
            if (!newName || newName == '') account =  await Account.findOneAndUpdate({email: email}, {password: hash(newPassword)});
            else account = await Account.findOneAndUpdate({email: email}, {name: newName, password: hash(newPassword)});

            return res.json({
                success: true,
                email: email,
                name: account.name
            });
        } catch (error) {
            return res.json({success: false});
        }
    }

    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const account = await Account.findOne({email: email});
            if (!account) return res.json({success: false, mess: 'Tài khoản không tồn tại'});
            if (hash(password) != account.password) return res.json({success: false, mess: 'Mật khẩu không chính xác'});
            
            return res.json({
                success: true,
                email: email,
                name: account.name
            });
        } catch (error) {
            return res.json({success: false});
        }
    }
}

function hash(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0 ;i<str.length ; i++) {
        ch = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;
}

module.exports = new AccountCtl