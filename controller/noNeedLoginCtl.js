const Book = require('../model/book')
const Technology = require('../model/technology')
const Science = require('../model/science')
const Economy = require('../model/economy')
const LifeSkill = require('../model/lifeSkill')
const Category = require('../model/category')

class NoNeedLoginCtl {

    async addNumberOfRead(req, res) {
        const name = req.body.name;

        if (!name) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});
        
        try {
            const book = await Book.findOne({name: name});
            if (!book) return res.json({success: false, mess: 'Không tìm thấy sách'});
            await Book.findByIdAndUpdate(book._id, {numberOfRead: book.numberOfRead + 1});

            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    async related(req, res) {
        const name = req.body.name;
        const type = req.body.type;

        try {
            var listFind, list = new Array;
            switch (type) {
                case 'Công nghệ': listFind = await Technology.find(); break;
                case 'Khoa học': listFind = await Science.find(); break;
                case 'Kinh tế': listFind = await Economy.find(); break;
                default: listFind = await LifeSkill.find(); break;
            }
            var number = 0;
            for (var i = 0; i < listFind.length; i++) {
                if (listFind[i].name != name) {
                    list.push(listFind[i]);
                    number++;
                }
                if (number == 3) break;
            }

            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async inforBook(req, res) {
        const name = req.body.name;

        try {
            const book = await Book.findOne({name: name});

            return res.json(book);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async allBook(req, res) {
        try {
            const list = await Book.find();

            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async limitHot(req, res) {
        try {
            const listHot = await Book.find().sort({numberOfRead: -1}).limit(3);

            return res.json(listHot);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async limitNew(req, res) {
        try {
            const listNew = await Book.find();

            return res.json(listNew.slice(-3));
        } catch (error) {
            return res.json({success: false});
        }
    }

    async hot(req, res) {
        try {
            const listHot = await Book.find().sort({numberOfRead: -1});

            return res.json(listHot);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async new(req, res) {
        try {
            const listNewReversed = await Book.find();

            return res.json(listNewReversed);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async technology(req, res) {
        try {
            const list = await Technology.find();

            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async science(req, res) {
        try {
            const list = await Science.find();

            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async economy(req, res) {
        try {
            const list = await Economy.find();

            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async lifeSkill(req, res) {
        try {
            const list = await LifeSkill.find();

            return res.json(list);
        } catch (error) {
            return res.json({success: false});
        }
    }

    async category(req, res) {
        try {
            const category = await Category.find();

            return res.json(category)
        } catch (error) {
            return res.json({success: false});
        }
    }
}

module.exports = new NoNeedLoginCtl