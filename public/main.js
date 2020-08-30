//const value
const btnSection = document.querySelector(".btn-section");
const showBlock = document.querySelector(".content-target");
const dateFilter = document.querySelector(".date-filter");
const categoryFilter = document.querySelector(".category-filter");
const typeImages = Array.from(document.querySelectorAll(".image"));
const reset = document.querySelector(".sync");
const moneyRecord = document.getElementsByClassName("money-record");
if(btnSection !== null && 
   showBlock  !== null &&
   dateFilter !== null &&
   categoryFilter !== null && 
   typeImages.length > 0 &&
   reset, moneyRecord.length > 0){
//init data
    const data = Array.from(document.querySelectorAll(".all-data")).map(data=>{
        return {
            id: data.children[0].children[0].dataset.id,
            shop: data.children[0].children[1].dataset.shop,
            title: data.children[0].children[2].dataset.title,
            date: data.children[0].children[3].dataset.date,
            category: data.children[0].children[4].dataset.category,
            categoryName: data.children[0].children[4].dataset.categoryname,
            cost: data.children[0].children[5].dataset.cost,
            type: data.children[0].children[6].dataset.type,
            typeName: data.children[0].children[6].dataset.typename
        };
    });   
    //render data
    var selectTarget = data;
    var dateSelect = "";
    var categorySelect = "";
    var money = parseInt(moneyRecord[0].innerHTML);
    //ALL FUNCTIONS
    //render template
    function renderContent(content){
        showBlock.innerHTML = "";
        let dom = "";
        if(content.length > 0){
            content.forEach(data=>{
                let typeColor = data.type === 'cost' ? 'text-danger' : 'text-primary';
                let categoryName = data.categoryName === "" ? "na" : data.categoryName;
                let shop = data.shop === "" ? "na" : data.shop; 
                dom += `
                        <div class="card mt-2 all-data container" data-type="${data.type}" data-toggle="modal" data-target="#editItem_${data.id}">
                            <div class="card-body row">
                                <span data-id="${data.id}" style="display: none;"></span>
                                <span class="col-md-2 text-center" data-shop="${shop}">${shop}</span>
                                <span class="col-md-2 text-center" data-title="${data.title}">${data.title}</span>
                                <span class="col-md-2 text-center" data-date="${data.date}">${data.date}</span>
                                <span class="col-md-2 text-center" data-category="${categoryName}">${categoryName}</span>
                                <span class="col-md-2 text-center" data-cost="${data.cost}">${data.cost}</span>
                                <span class="col-md-2 text-center ${typeColor}" data-type="${data.type}">${data.typeName}</span> 
                            </div>
                        </div>`;
            })
        }else{
            dom += `<h3 class="text-center mt-5">~沒有資料喔~</h3>`;
        }
        return dom;
    }
    //set image color
    function setImageColor(typeImages, num, money){
        dateSelect = "";
        categorySelect = "";
        moneyRecord[0].innerHTML = money;
        typeImages.forEach((type, key)=>{
            if(key === num){
                type.classList.add("btn-section-select");
            }else{
                type.classList.remove("btn-section-select");
            }
        })
        resetSelecter();
    }
    //reset selecter
    function resetSelecter(){
        categoryFilter.value = "";
        dateFilter.value = "";
        showBlock.insertAdjacentHTML('afterbegin', renderContent(selectTarget));
    }
    function calcMoney(e){
        if(e.type === "cost"){
            money -= parseInt(e.cost);
        }else{
            money += parseInt(e.cost);
        }
    }
    reset.addEventListener("click", ()=>{
        resetSelecter();
    })
    //ALL EVENT
    //reset template

    //type button click
    btnSection.addEventListener("click", (e)=>{
        if(e.target.nodeName === "IMG"){
            selectTarget = [];
            money = 0;
            if(e.target.dataset.type === "cost"){
                data.forEach(result=>{
                    if(result.type === "cost"){
                        money -= parseInt(result.cost);
                        selectTarget.push(result);
                    }
                })
                setImageColor(typeImages, 0, money);
            }
            if(e.target.dataset.type === "all"){
                data.forEach(result=>{
                    if(result.type === "cost"){
                        money -= parseInt(result.cost);
                    }else{
                        money += parseInt(result.cost);
                    }
                    selectTarget.push(result);
                })
                setImageColor(typeImages, 1, money);
            }
            if(e.target.dataset.type === "income"){
                data.forEach(result=>{
                    if(result.type === "income"){
                        money += parseInt(result.cost);
                        selectTarget.push(result);
                    }
                })
                setImageColor(typeImages, 2, money);
            }
        };
        showBlock.insertAdjacentHTML('afterbegin', renderContent(selectTarget));
    })
    //date filter
    dateFilter.addEventListener("change", (e)=>{
        let template = [];
        money = 0;
        dateSelect = e.target.value;
        selectTarget.forEach(data=>{
            if(data.date === e.target.value){
                if(categorySelect !== ""){
                    if(categorySelect === "all"){
                        calcMoney(data);
                        template.push(data);
                    }else{
                        if(categorySelect === data.category){
                            calcMoney(data);
                            template.push(data);    
                        }
                    }
                }else{
                    calcMoney(data);
                    template.push(data);
                }
            }
        })
        moneyRecord[0].innerHTML = money;
        showBlock.insertAdjacentHTML('afterbegin', renderContent(template));
    })
    //category filter
    categoryFilter.addEventListener("change", (e)=>{
        let template = [];
        money = 0;
        categorySelect = e.target.value;
        if(e.target.value === "all"){
            if(dateSelect !== ""){
                selectTarget.forEach(data=>{
                    if(data.date === dateSelect){
                        calcMoney(data);
                        template.push(data);    
                    }
                })
            }else{
                selectTarget.forEach(data=>{
                    calcMoney(data);
                    template.push(data);
                })
            }
        }else{
            selectTarget.forEach(data=>{
                if(data.category === e.target.value){
                    if(dateSelect !== ""){
                        if(data.date === dateSelect){
                            calcMoney(data);
                            template.push(data);    
                        }
                    }else{
                        calcMoney(data);
                        template.push(data);
                    }
                }
            })
        }
        moneyRecord[0].innerHTML = money;
        showBlock.insertAdjacentHTML('afterbegin', renderContent(template));
    })
}