const Account = require('../model/account')
const ReadRecently = require('../model/readRecently')
const Collection = require('../model/collection')

class NeedLoginCtl {

    async addCollection(req, res) {
        const email = req.body.email;
        const img = req.body.img;
        const name = req.body.name;
        const author = req.body.author;

        if (!email || !img || !name || !author) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            await new Collection({
                email: email,
                img: img,
                name: name,
                author: author
            }).save();
            
            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    async addRecently(req, res) {
        const email = req.body.email;
        const img = req.body.img;
        const name = req.body.name;
        const author = req.body.author;

        if (!email || !img || !name || !author) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const book = await ReadRecently.findOneAndUpdate({email: email, date: Date.now()});
            if (!book) {
                await new Collection({
                    email: email,
                    img: img,
                    name: name,
                    author: author
                }).save();
            }
            
            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    async delCollection(req, res) {
        const email = req.body.email;
        const name = req.body.name;

        if (!email || !name) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            await ReadRecently.remove({email: email, name: name});
            
            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    async recently(req, res) {
        const email = req.query.email;

        if (!email) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const list = await ReadRecently.find({email: email}).sort({date: -1});
            
            return res.json({
                success: true,
                list: list
            });
        } catch (error) {
            return res.json({success: false});
        }
    }

    async collection(req, res) {
        const email = req.query.email;

        if (!email) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const list = await Collection.find({email: email});
            
            return res.json({
                success: true,
                list: list
            });
        } catch (error) {
            return res.json({success: false});
        }
    }
}

module.exports = new NeedLoginCtl