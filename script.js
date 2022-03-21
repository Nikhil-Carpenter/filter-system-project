// console.log("hello")

let PRODUCTS =[];

if (localStorage.getItem("PRODUCTS")!==null)
{
    PRODUCTS = JSON.parse(localStorage.getItem("PRODUCTS")) ;
}
else
{
    localStorage.setItem("PRODUCTS",JSON.stringify(PRODUCTS));
}
let filteredProducts = PRODUCTS;


let totalPages = null;
let currentPage = null;
let start = null;
let end = null;
let paginate = [];


function createPageLinks(){

  
  for(let i = 1;i<=totalPages;i++){
    let link = document.createElement("a");
    link.classList.add("pageLink");
    link.append(i);
    link.onclick = function(){
      openPage(i);
    }
    document.getElementById("pageLinks").appendChild(link);
  }
}

function setUpPagination()
{

  totalPages = Math.ceil(filteredProducts.length/10);
    document.getElementById("totalPages").innerText = totalPages;

  currentPage = 1;
  document.getElementById("currentPage").innerText=currentPage;

  

  start = (currentPage-1)*10;
  end = currentPage*10;

  paginate = filteredProducts.slice(start,end);

}




// array used 
// [
//   {
//     id: 1,
//     productName: "iphone",
//     category: "electronics",
//     price: 78000,
//     seller: "NK inc.",
//     company: "Apple",
//   },

//   {
//     id: 2,
//     productName: "smartwatch",
//     category: "wearables",
//     price: 23000,
//     seller: "sharma sons",
//     company: "Apple",
//   },

//   {
//     id: 3,
//     productName: "pressure cooker",
//     category: "general",
//     price: 2500,
//     seller: "Ratlam store",
//     company: "Bajaj",
//   },
//   {
//     id: 4,
//     productName: "fitness tracker",
//     category: "wearables",
//     price: 8000,
//     seller: "gupta company",
//     company: "MI",
//   },
//   {
//     id: 5,
//     productName: "laptop",
//     category: "electronics",
//     price: 60000,
//     seller: "vishal traders",
//     company: "ASUS",
//   },
// ];



function display(arr) {
  document.getElementById("data").innerText = "";

  let numbering = start+1
  arr.forEach(function (product, index) {
    let tr = document.createElement("tr");

    let numTD = document.createElement("td");
    numTD.append(numbering);

    tr.appendChild(numTD);
    numbering++;

   

    let nameTD = document.createElement("td");
    nameTD.append(product.productName);
    tr.appendChild(nameTD);

    let categoryTD = document.createElement("td");
    categoryTD.append(product.category);
    tr.appendChild(categoryTD);

    let priceTD = document.createElement("td");
    priceTD.append(product.price);
    tr.appendChild(priceTD);

    let imageTD = document.createElement("td");
    let imgEle = document.createElement("img") ;
    imgEle.src = product.image;
    imgEle.classList.add("pro_img");
    imageTD.appendChild(imgEle);
    tr.appendChild(imageTD);

    let sellerTD = document.createElement("td");
    sellerTD.append(product.seller);
    tr.appendChild(sellerTD);

    let companyTD = document.createElement("td");
    companyTD.append(product.company);
    tr.appendChild(companyTD);

    let actionsTD = document.createElement("td");
    actionsTD.classList.add("actions");

    let viewIcon = document.createElement("i");
    viewIcon.classList.add("fa-solid");
    viewIcon.classList.add("fa-eye");
    actionsTD.append(viewIcon);

    viewIcon.addEventListener('click',function(){

      viewProducts(product.id)
      
    })

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen-to-square");
    actionsTD.append(editIcon);
    editIcon.addEventListener('click',function(){
      setupUpdateProducts(product.id);
    })

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash-can");
    actionsTD.append(deleteIcon);

    deleteIcon.addEventListener("click",function(){
      deleteProduct(product.id);
      
    })

    tr.appendChild(actionsTD);

    document.getElementById("data").appendChild(tr);
  });
}


setUpPagination();
createPageLinks();

display(paginate);
document.getElementById("message").style.display = "none";



function next()
{
  if (currentPage<totalPages) {
    
    currentPage++;
    

   openPage(currentPage);
  }

}

function prev()
{

  if (currentPage>1) {
    
    currentPage--;
    openPage(currentPage);
  }

}

function openPage(pageNo){


    currentPage = pageNo;

      if (currentPage!=="" && currentPage!==null && currentPage >= 1 && currentPage<= totalPages) 
      {

            document.getElementById("currentPage").innerText=currentPage;
            start = (currentPage-1)*10;
            end = currentPage*10;
            paginate = filteredProducts.slice(start,end);
         

        display(paginate);

      }

}




//for multiple filter

let filters = {
  name: null,
  category: null,
  priceRange: null,
  company: null,
};

function getValue(event, property) {
  if (event.target.value !== "") {
    filters[property] = event.target.value;
  } else {
    filters[property] = null;
  }

  console.log(filters);
}

// for only one filter we did this

// let productName;
// function getValue(event){
//     productName = (event.target.value).toLowerCase().trim();

// }


function filter() {
  filteredProducts = PRODUCTS;
  console.log(filteredProducts)

  if (filters.name !== null) {
    filteredProducts = filteredProducts.filter(function (product, index) {
      return filters.name.toUpperCase() === product.productName.toUpperCase();
    });
  }

  if (filters.category !== null) {
    filteredProducts = filteredProducts.filter(function (product, index) {
      return filters.category.toUpperCase() === product.category.toUpperCase();
    });
  }

  if (filters.priceRange !== null) {
    let price = filters.priceRange.split("-");

    filteredProducts = filteredProducts.filter(function (product, index) {
      return ( product.price >= Number(price[0]) && product.price <= Number(price[1]) );
    });
  }

  if (filters.company !== null) {
    filteredProducts = filteredProducts.filter(function (product, index) {
      return filters.company.toLowerCase() === product.company.toLowerCase();
    });
  }

  if (filteredProducts.length!==0) 
{
  
    document.getElementById("message").style.display = "none";

    setUpPagination();
    document.getElementById("pageLinks").innerText="";

    createPageLinks();
    display(paginate);

}else{
    document.getElementById("data").innerHTML = "";
    document.getElementById("message").style.display = "flex";
}

 

  // display(filteredProducts);
  // console.log(filteredProducts);
}



// function for toggle the modal

function toggleModal(open,modalId){
  if(open===true){
    document.getElementById(modalId).style.display="flex"
  }else{
    
    document.getElementById(modalId).style.display="none"
  }
}



function closeModal(event,textId){

  if(event.target.id === textId){

    toggleModal(false,event.target.id);
  }
}

// Function to add a new product

function addProduct(){

  let product = {};
  if (PRODUCTS.length!==0) {
    let lastId = PRODUCTS[PRODUCTS.length-1].id;
    product.id = ++lastId;
  }else{
    product.id = 1;
  }

  product.productName = document.getElementById("product_name").value;
  product.category = document.getElementById("product_category").value;
  product.price = Number(document.getElementById("product_price").value);
  product.seller = document.getElementById("seller_name").value;
  product.company = document.getElementById("company_name").value;
  product.image = document.getElementById("img_url").value;

  PRODUCTS.push(product);

  // filter();

  display(paginate);
  alert("New product Added")
  // console.log(product);
  toggleModal(false,'add_modal');

  //saving data in local storage (the whole PRODUCTS array)
  localStorage.setItem("PRODUCTS",JSON.stringify(PRODUCTS));
}



// function to delete a product

let deleteId = null;

function deleteProduct(id)
{
    deleteId = id;
    // confirmation pop up open
    toggleModal(true,'delete_modal');
  
}

function confirmation(status)
{
  if (status === true) 
  {
    
    let productIndex = filteredProducts.findIndex(function(product,index){
        return product.id === deleteId;
    })

    filteredProducts.splice(productIndex,1);

    let mainProductIndex = PRODUCTS.findIndex(function(product,index){
        return product.id === deleteId;
    })

    PRODUCTS.splice(mainProductIndex,1);


    start = (currentPage-1)*10;
    end = currentPage*10;
  
    paginate = filteredProducts.slice(start,end);
  


    localStorage.setItem("PRODUCTS",JSON.stringify(PRODUCTS));

    filter();
    display(paginate);

  }

  toggleModal(false,'delete_modal');

}



// function for view product



function viewProducts(id){

  let  product = PRODUCTS.find(function(product,index){
    return product.id === id;
  })

  document.getElementById("pro_img").src = product.image;
  document.getElementById("pro_name").innerText = product.productName;
  document.getElementById("pro_price").innerText = `Prices : ${product.price}`;
  document.getElementById("pro_company").innerText = `Company : ${product.company}`;
  document.getElementById("pro_category").innerText = `Category : ${product.category}`;
  document.getElementById("pro_seller").innerText = `Seller : ${product.seller}`;

  toggleModal(true,'view_modal');

}


// function for setup and update the data

let productToUpdate = null;

function setupUpdateProducts(id){

  productToUpdate = PRODUCTS.find(function(product,index)
  {
      return product.id === id;
  })

  document.getElementById("product_name_up").value= productToUpdate.productName;
  document.getElementById("product_category_up").value= productToUpdate.category;
  document.getElementById("product_price_up").value= productToUpdate.price;
  document.getElementById("seller_name_up").value= productToUpdate.seller;
  document.getElementById("company_name_up").value= productToUpdate.company;
  document.getElementById("img_url_up").value= productToUpdate.image;


  toggleModal(true,'update_modal')
}

// /function to really update the product

function updateProducts(){

  productToUpdate.productName = document.getElementById("product_name_up").value;
  productToUpdate.category = document.getElementById("product_category_up").value;
  productToUpdate.price = Number(document.getElementById("product_price_up").value);
  productToUpdate.seller = document.getElementById("seller_name_up").value;
  productToUpdate.company = document.getElementById("company_name_up").value;
  productToUpdate.image = document.getElementById("img_url_up").value;
  
    // filter();
    
    display(paginate);

    
    toggleModal(false,'update_modal');
    localStorage.setItem("PRODUCTS",JSON.stringify(PRODUCTS));

}