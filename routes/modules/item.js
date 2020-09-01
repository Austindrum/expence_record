const express = require("express");
const router = express.Router();
const Item = require("../../models/item");

router.get("/*", (req, res)=>{
    res.redirect("/");
})

router.post("/", (req, res)=>{
    let { title, type, cost, shop, date, category } = req.body;
    let userId = req.user._id;
    return Item.create({
            title, type, cost, shop, date, category, userId
        })
        .then(()=>{
            req.flash("success_msg", "建立成功");
            res.redirect("/");
        })
        .catch(err=>console.log(err))
});
router.put("/:id", (req, res)=>{
    let _id = req.params.id;
    let userId = req.user._id;
    let { title, type, cost, shop, date, category } = req.body;
    return Item.findOne({ _id, userId })
            .then((item)=>{
                Object.assign(item, { title, type, cost, shop, date, category });
            })
            .then(()=>{
                req.flash("success_msg", "更新成功");
                res.redirect("/");
            })
})
router.delete("/:id", (req, res)=>{
    let _id = req.params.id;
    let userId = req.user._id;
    return Item.findOne({ _id, userId })
            .then((item)=> item.remove())
            .then(()=> {
                req.flash("success_msg", "明細刪除成功");
                res.redirect("/")
            })
            .catch(err=> console.log(err))
})
module.exports = router;