const express = require("express");
const router = express.Router();
const user = require("./modules/user");
const auth = require("./modules/auth");
const item = require("./modules/item");
const category = require("./modules/category");
const { authenticator } = require("../middleware/auth");

const Category = require("../models/category");
const Item = require("../models/item");

router.use("/category", authenticator, category);
router.use("/item", authenticator, item);
router.use("/user", user);
router.use("/auth", auth);

router.get("/", authenticator, (req, res)=>{
    let userId = req.user._id;
    Category.find({ userId }).then(categories=>{
        return categories;
    })
    .then((categories)=>{
        Item.find({ userId }).then(items=>{
            let moneyRecord = 0;
            let errors = [];
            items.forEach(item=>{
                item.type === "income" ? moneyRecord += item.cost : moneyRecord -= item.cost;
                categories.forEach(category=>{
                    if(item.category == category._id){
                        item.categoryName = category.name;
                    }else{
                        item.categoryName = "";
                    }
                })
                if(item.type === "cost"){
                    item.typeName = "支出"
                }else{
                    item.typeName = "收入"
                }
            })
            return res.render("index", {items, categories, moneyRecord, errors});
        })
    })
})

module.exports = router;