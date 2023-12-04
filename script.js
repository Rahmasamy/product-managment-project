let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let adds=document.getElementById('adds');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let temp;

//get total function 
 function getTotal(){
    if (price.value != ''){
        //+ for convert sting value to number 
        let result=(+price.value + +taxes.value + +adds.value)- +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor="bisque"
        total.style.color="#222"
    }
    else {
        total.innerHTML='';
        total.style.backgroundColor= 'rgb(93, 7, 7)';
        total.style.color="bisque";
    }
 }
//create product
let data;
if (localStorage.product !=null){
    data=JSON.parse(localStorage.product);
}
else {
    data=[];
} 
submit.onclick=function create(){
    let newpro ={
     title:title.value.toLowerCase(),
     price:price.value,
     taxes:taxes.value,
     adds:adds.value,
     discount:discount.value,
     total:total.innerHTML,
     count:count.value,
     category:category.value.toLowerCase()

    };
    // we create array tp collect objects 
    // when we relod the data in array will delete so we need to local storge 
    // if count >1 we newed to creat objects equal to this number 
    // count how many number of products you want to create 
    //check the empty of inputs
    if (title.value != ''
       && price.value != ''
       && category.value != '' 
       && newpro.count < 100 ){
        if (mood === 'create'){
            if (newpro.count > 1){
               for(let i = 0; i < newpro.count ; i++){
                   data.push(newpro);
               }
       
            }
            else {
             data.push(newpro);
            }
           }
           else {
               data[temp]=newpro;
               mood='create';
               count.style.display='block';
               submit.innerHTML='create';
       
           }
        clearData();
    }
    
    // save data in local storge 
    localStorage.setItem('product',JSON.stringify(data))
    //clear after creation 
   
    showData();
    
}

//clear data from inputs after the creation  
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    adds.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='' ;
    

}
//read data
function showData(){
   getTotal();
   let table='';
   for (let i= 0; i<data.length; i++){
    console.log(data);
    table += `
    <tr>
    <td> ${i+1}</td>
    <td> ${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes} </td>
    <td> ${data[i].adds}</td>
    <td> ${data[i].discount}</td>
    <td> ${data[i].total}</td>
    <td> ${data[i].category}</td>
    <td> <button onclick="updateData(${i})" id="update"> update</button></td>
    <td> <button onclick="deleteData(${i})" id="delete"> delete</button></td>
    </tr> 
    `
   }
   document.getElementById('tbody').innerHTML=table;
   let deleteall=document.getElementById('deleteAll');
   if (data.length>0){
    deleteall.innerHTML=`
    <button onclick="deleteall()"> delete All (${data.length})</button>
    `
   }
   else {
    deleteall.innerHTML=" "  
   }
}
showData();




// delete the product
function deleteData(i){
   data.splice(i,1);
   localStorage.product=JSON.stringify(data);
   showData();
}
function deleteall(){
  localStorage.clear();
  data.splice(0);
  showData();
}
//update product
function updateData(i){
   title.value=data[i].title;
   price.value=data[i].price;
   taxes.value=data[i].taxes;
   adds.value=data[i].adds;
   discount.value=data[i].discount;
   getTotal();
   count.style.display='none';
   submit.innerHTML='Update';
   category.value=data[i].category;
   mood='update';
   temp=i;
   scroll(
    {
        top:0,
        behavior:"smooth"

    }
   )
}
//search product 
let searchmood = 'title';

function getSearchMood(id)
{
   let search=document.getElementById('search');
   if (id == 'searchTitle'){
    searchmood = 'title';
    
    }
   else {
   searchmood = 'category';
  
   }
   search.placeholder=`Search by ${searchmood}`;
   search.focus();
   search.value='';
   showData();

}
// search 
function searchData(value){
  let table='';
  if (searchmood == 'title'){
    for (let i = 0; i <data.length; i++ ){
        if( data[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td> ${i}</td>
            <td> ${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes} </td>
            <td> ${data[i].adds}</td>
            <td> ${data[i].discount}</td>
            <td> ${data[i].total}</td>
            <td> ${data[i].category}</td>
            <td> <button onclick="updateData(${i})" id="update"> update</button></td>
            <td> <button onclick="deleteData(${i})" id="delete"> delete</button></td>
            </tr> 
            `
           }
           
        }
    }
    else {
        for (let i = 0; i <data.length; i++ ){
            if( data[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td> ${i}</td>
                <td> ${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes} </td>
                <td> ${data[i].adds}</td>
                <td> ${data[i].discount}</td>
                <td> ${data[i].total}</td>
                <td> ${data[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update"> update</button></td>
                <td> <button onclick="deleteData(${i})" id="delete"> delete</button></td>
                </tr> 
                `
               }
               
            }

    }
    document.getElementById('tbody').innerHTML=table;
  } 
  









//check for clean data 