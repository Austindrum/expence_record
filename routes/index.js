const express = require("express");
const router = express.Router();
const user = require("./modules/user");
const auth = require("./modules/auth");
const item = require("./modules/item");
const category = require("./modules/category");
const { authenticator } = require("../middleware/auth");

const Category = require("../models/category");
const Item = require("../models/item");
const { VirtualType } = require("mongoose");

router.use("/category", authenticator, category);
router.use("/item", authenticator, item);
router.use("/user", user);
router.use("/auth", auth);

router.get("/", authenticator, (req, res)=>{
    let userId = req.user._id;
    let items = [];
    Category.find({ userId }).then(categories=>{
        return categories;
    })
    .then((categories)=>{
        let moneyRecord = 0;
        let errors = [];
        Item.find({ userId }).then(item=>{
            item.forEach((data)=>{
                let typeName = "";
                let categoryName = "";
                data.type === "cost" ? moneyRecord -= data.cost : moneyRecord += data.cost;
                data.type === "cost" ? typeName = "支出" : typeName = "收入";
                categories.forEach(category => category._id == data.category ? categoryName = category.name : "" );
                items.push({
                    _id: data._id,
                    title: data.title,
                    type: data.type,
                    typeName,
                    cost: data.cost,
                    shop: data.shop,
                    date: data.date,
                    category: data.category,
                    categoryName,
                    userId
                });
            })
            return {items, categories, errors, moneyRecord}
        })
        .then(result =>{
            return res.render("index", {
                items: result.items, 
                categories: result.categories, 
                moneyRecord: result.moneyRecord, 
                errors: result.errors
            });
        })
    })
})

module.exports = router;