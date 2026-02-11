let items=[];
const getALL=() =>{ 
    return items;
}
const additem=(item)=>{
    if(!items) return items;
    items.push(item)
    return items;
}
const deleteall=()=>{
    items=[];
    return items;
}
const countitem=()=>{ 
    return items.length;
}
module.exports={
    getALL,
    additem,
    deleteall,
    countitem
}  