const express = require("express");
const router = express.Router();
const Category = require("../../models/category");
const Item = require("../../models/item");

router.get("/*", (req, res)=>{
    res.redirect("/");
})

router.post("/", (req, res)=>{
    let userId = req.user._id;
    return Category.find({ userId }).then((categories)=>{
                let userId = req.user._id;
                if(!categories.some(category=> category.name === req.body.title)){
                    Category.create({ name: req.body.title, userId }).then(()=> {
                        req.flash("success_msg", "類別建立成功")
                        return res.redirect("/")
                    });      
                }else{
                    req.flash("error_msg", "此類別已存在")
                    return res.redirect("/");
                }
            })
})
router.delete("/:id", (req, res)=>{
    let _id = req.params.id;
    let userId = req.user._id;
    return Category.findOne({ _id, userId })
        .then(category=> category.remove())
        .then(()=> {
            Item.find({ category: _id })
            .then(items=>{
                items.forEach(item=>{
                    items.category = "";
                    item.save();
                })
            })
            .then(()=>{
                req.flash("success_msg", "類別刪除成功")
                res.redirect("/");
            })
        })
        .catch(err=> console.log(err));
})



module.exports = router;