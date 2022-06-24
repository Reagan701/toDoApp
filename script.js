const button = document.getElementById("AddButton");
let container = document.getElementById("items");
const sortTitle = document.getElementById("sortingClass");
let items;

// localStorage.clear();
checkItems();

function clearAll(){
    localStorage.clear();
    document.getElementById("items").innerHTML = '';
    items = [];
}

function checkItems(){
    if(JSON.parse(localStorage.getItem('records'))){
        if(JSON.parse(localStorage.getItem('records')).length > 1){
            items = localStorage.getItem('records');
            items = JSON.parse(items);
        }else{
            items =
        [
            {
                id: 1,
                item: "Homework",
                createdDate: new Date(),
                isDone: false
            }
        ];
        localStorage.setItem('records', JSON.stringify(items));
        }
    }else{
        items =
        [
            {
                id: 1,
                item: "Homework",
                createdDate: new Date(),
                isDone: false
            }
        ];
        localStorage.setItem('records', JSON.stringify(items));
    }
}

function createCurrentItems(){
    items.forEach(e => {
        addItem(e);
    });
}
createCurrentItems();

function addNewItem(){
    let title = document.getElementById("newItemTitle").value;
    if(title == ''){
        return;
    }

    let newId = items.length + 1;

    items.push({
        id: newId,
        item: title,
        createdDate: new Date(),
        isDone: false
    });

    let newItem = {
        id: newId,
        item: title,
        createdDate: new Date(),
        isDone:false
    }

    localStorage.setItem('records', JSON.stringify(items));
    addItem(newItem);
}

function addItem(newItem){
    let currentDate = newItem.createdDate.toString();
    let slicedDate = currentDate.slice(0,10);
    container.innerHTML += `
    <div id="${newItem.id}" class="row my-1 p-2 w-100 mx-auto justify-content-center flex-row align-items-center bg-light w-50 text-center">
        <div class="col-md-3">
            <input onclick="checkItem(this,this.parentElement.parentElement)" id="InputStyle" type="checkbox">
        </div>
        <div class="col-md-3">
            <label class="${newItem.id}" id="LabelStyle" for="${newItem.item}">${newItem.item}</label>
            </div>
        <div class="col-md-3">
            <label id="DateStyle" for="${slicedDate}">${slicedDate}</label>
        </div>
        <div class="col-md-3">
            <i id="DeleteIcon" class="bi bi-x-circle-fill" onclick="deleteItem(this.parentElement.parentElement)"></i>
        </div>
     </div>`
}

function checkItem(input,item){
    if(!input.checked){
        items.forEach(e => {
            if(e.id == item.id){
                document.getElementsByClassName(`${item.id}`)[0].style = "text-decoration:none"
                e.isDone = false;
            }
        });
    }else{
        items.forEach(e => {
            if(e.id == item.id){
                document.getElementsByClassName(`${item.id}`)[0].style = "text-decoration:line-through"
                e.isDone = true;
            }
        });
    }
}

function deleteItem(item){
    let currentItems = JSON.parse(localStorage.getItem('records'));
    for(let i = 0; i<currentItems.length;i++){
        if(currentItems[i].id == item.id){
            currentItems.splice(i,1);
            currentItems = JSON.stringify(currentItems);
            localStorage.setItem('records',currentItems);
            checkItems();
        }
    }
            
    item.remove();
}

function sortByAsc(){
    container.innerHTML = '';
    let sortedItems = items.sort((a,b) =>{
        if(a.item.toLowerCase() < b.item.toLowerCase()){return -1};
        if(a.item.toLowerCase() > b.item.toLowerCase()){return 1};
        return 0;
    })
    sortTitle.innerHTML = "In ascending order";
    sortedItems.forEach(e => {
        addItem(e);
    });
    
}

function sortByDesc(){
    container.innerHTML = '';
    let sortedItems = items.sort((a,b) =>{
        if(a.item.toLowerCase() < b.item.toLowerCase()){return 1};
        if(a.item.toLowerCase() > b.item.toLowerCase()){return -1};
        return 0;
    })
    sortTitle.innerHTML = "In descending order";
    sortedItems.forEach(e => {
        addItem(e);
    });
}

function sortByDate(){
    container.innerHTML = '';
    let sortedItems = items.sort((a,b) =>{
        if(a.createdDate < b.createdDate){return 1};
        if(a.createdDate > b.createdDate){return -1};
        return 0;
    })
    sortTitle.innerHTML = "By Date";
    sortedItems.forEach(e => {
        addItem(e);
    });
}