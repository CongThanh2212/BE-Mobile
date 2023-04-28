const Account = require('../model/account')
const ReadRecently = require('../model/readRecently')
const Collection = require('../model/collection')
const Book = require('../model/book')

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
            // add amount read
            const addNumberOfRead = await Book.findOne({name: name});
            if (!addNumberOfRead) return res.json({success: false, mess: 'Không tìm thấy sách'});
            await Book.findByIdAndUpdate(addNumberOfRead._id, {numberOfRead: addNumberOfRead.numberOfRead + 1});

            // add recently
            const book = await ReadRecently.findOneAndUpdate({email: email, name: name}, {date: Date.now()});
            if (!book) {
                await new ReadRecently({
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
            await Collection.deleteOne({email: email, name: name});
            
            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    async recently(req, res) {
        const email = req.body.email;

        if (!email) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const list = await ReadRecently.find({email: email}).sort({date: -1});
            
            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async collection(req, res) {
        const email = req.body.email;

        if (!email) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const list = await Collection.find({email: email});
            
            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async collectionYesOrNo(req, res) {
        const email = req.body.email;
        const name = req.body.name;

        if (!email || !name) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            const book = await Collection.findOne({email: email, name: name});
            
            if (book) return res.json({success: true});
            return res.json({success: false});
        } catch (error) {
            return res.json({success: false});
        }
    }
}

module.exports = new NeedLoginCtl