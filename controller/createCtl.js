const Book = require('../model/book')
const Technology = require('../model/technology')
const Science = require('../model/science')
const Economy = require('../model/economy')
const LifeSkill = require('../model/lifeSkill')
const Category = require('../model/category')

class NoNeedLoginCtl {

    async newCategory(req, res) {
        const category = req.body.category;
        const link = req.body.link;

        if (!category || !link) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});

        try {
            await new Category({
                name: category,
                link: link
            }).save();

            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

    async newBook(req, res) {
        const img = req.body.img;
        const name = req.body.name;
        const author = req.body.author;
        const description = req.body.description;
        const type = req.body.type;
        const language = req.body.language;
        const pdf = req.body.pdf;

        if (!name || !img || !author || !description || !type || !language || !pdf) return res.json({success: false, mess: 'Chưa nhập đầy đủ thông tin'});
        
        try {
            await new Book({
                img: img,
                name: name,
                author: author,
                description: description,
                type: type,
                language: language,
                pdf: pdf
            }).save();

            switch(type) {
                case 'Kỹ năng sống': {
                    await new LifeSkill({
                        img: img,
                        name: name,
                        author: author
                    }).save();
                    break;
                }
                case 'Kinh tế': {
                    await new Economy({
                        img: img,
                        name: name,
                        author: author
                    }).save();
                    break;
                }
                case 'Khoa học': {
                    await new Science({
                        img: img,
                        name: name,
                        author: author
                    }).save();
                    break;
                }
                // Công nghệ
                default: {
                    await new Technology({
                        img: img,
                        name: name,
                        author: author
                    }).save();
                }
            }

            return res.json({success: true});
        } catch (error) {
            return res.json({success: false});
        }
    }

}

module.exports = new NoNeedLoginCtl