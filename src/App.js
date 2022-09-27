import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {

  const[product, setProducts] = useState([]);
  const[categories,setCategories] = useState([]);
  const[catgoriesFilter,setcatgoriesFilter] = useState([]);
  const[brands,setBrands] = useState([]);
  const[brandFilter,setBrandFilter] = useState([]);
  const[ratingFilter,setratingFilter] = useState("");
  const[filterItem,setFilterItem] = useState([]);
  const[cardItem,setcardItem] = useState([]);
  const [style, setStyle] = useState("cadList");



  useEffect(()=>{
     fetchdataHandler()
     console.log("ad_____",cardItem)
  },[])

  const fetchdataHandler = async() =>{
    let res  =  await axios.get("https://dummyjson.com/products?limit=100")
    console.log(res.data)
    await setProducts(res.data.products)
    await productFilter(res.data.products)
    await setFilterItem(res.data.products)
  }

  const productFilter = async (product) => {
    console.log('products' ,product)
    var Categories = [];
    var Brands = [];
    // let filterItem = filterItem?filterItem:product
    product.map((key,value) => {
         if (!Categories.includes(key.category)){
          Categories.push(key.category)
         }
         if (!Brands.includes(key.brand)){
          Brands.push(key.brand)
         }
    })
    setCategories(Categories)
    setBrands(Brands)
    console.log(categories)
    console.log(brands)
  }

  const onclickCategoryCheckboxhandler = (e) =>{
    var BrandFilter = brandFilter
    if (!BrandFilter.includes(e.target.value)){
      BrandFilter.push(e.target.value)
     }else{
      var index = BrandFilter.indexOf(e.target.value)
      BrandFilter.splice(index,1)
     }
     setBrandFilter(BrandFilter)
     console.log(brandFilter)
  }

  const onclickBrandCheckboxhandler = (e) =>{
    var CatgoriesFilter = catgoriesFilter
    if (!CatgoriesFilter.includes(e.target.value)){
      CatgoriesFilter.push(e.target.value)
     }else{
      var index = CatgoriesFilter.indexOf(e.target.value)
      CatgoriesFilter.splice(index,1)
     }
     setcatgoriesFilter(CatgoriesFilter)
     console.log(catgoriesFilter)
  }

  const categoriesMap = () => {
   return categories.map((key,value) => (
    <div className="checkbox">
      <label><input type="checkbox" value={key} key={value} onChange={(e) =>{onclickCategoryCheckboxhandler(e)}} />{key}</label>
    </div>
       ))
  }

  const brandsMap = () => {
    return brands.map((key,value) => (
     <div className="checkbox">
       <label><input type="checkbox" value={key} key={value} onChange={(e) =>{onclickBrandCheckboxhandler(e)}} />{key}</label>
     </div>
        ))
   }

  const productMapHandle = () => {
    return filterItem.map((key,value)=>(
      <>
      <div className="col-md-4 product_bar">
        <div className="card">
          <img src={key.thumbnail} className="card-img-top" alt="..." />
          <div className="card-body" style={{"background":"black"}}>
            <h5 className="card-title">{key.title} / Rs {key.price} </h5>
            <p className="card-text">{key.category} / {key.rating}</p>
          <p>{key.stock == 50}</p>
           <a className="btn btn-primary" onClick={(e) => AddToCard(key)}>Add to Card</a>
  </div>
</div>
      </div>
      </>
    ))
  }
  
  const addItemHandler =() => {
    return cardItem.map((key,value)=>(
      <>
      <div className="side_vard_border">
             <div className="custom_body" key={value.id}>
            <div className="row">
              <div className="col-md-4">
                <img src={key.thumbnail}className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title">{key.title} <span  onClick={() => {deleteitem(key)}}>Delete</span></h5>
                  <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p><small className="text-muted">{key.title} / Rs {key.price}</small></p>
                  <p ><small className="text-muted">{key.category} / {key.rating}</small></p>
                </div>
              </div>
            </div>
        </div>
        </div>
      </>
    ))
  }

  const AddToCard = async(e) => {
    let SetAddItem = cardItem
    if(!cardItem.includes(e)){
      SetAddItem.push(e)
    }
    else{
      alert("item Alredy Added")
    }
    await setcardItem(SetAddItem)
    console.log(cardItem.length)
  }

  const deleteitem = (key) => {
    const index = cardItem.indexOf(key);
    cardItem.splice(index,1)
    console.log(cardItem)
  }


  const addToCardbind = () => {
    
    return (
      <>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => addToCardbind()}>
View Card Items 
</button>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">View Card Items</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body custum_card">
        { 
        
          cardItem.map((key,value) => (
            <>
            <div className="card mb-3 custom_body" key={value.id} style={{maxWidth:'540px'}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={key.thumbnail}className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title">{key.title} <span  onClick={() => {deleteitem(key)}}>Delete</span></h5>
                  <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p><small className="text-muted">{key.title} / Rs {key.price}</small></p>
                  <p ><small className="text-muted">{key.category} / {key.rating}</small></p>
                </div>
              </div>
            </div>
        </div>
</>
          ))
        }
    
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</>
    )
  }

  const ratingStar = () => {
    return (
    <div style={{display:'grid',textAlign:'left'}}>
    <label><input type="radio" value="5" name="radio"  onChange={(e) =>{setratingFilter(e.target.value)}} />5 satr</label>
      <label><input type="radio" value="4" name="radio"  onChange={(e) =>{setratingFilter(e.target.value)}} />4 satr</label>
      <label><input type="radio" value="3" name="radio" onChange={(e) =>{setratingFilter(e.target.value)}} />3 satr</label>
      <label><input type="radio" value="2" name="radio"  onChange={(e) =>{setratingFilter(e.target.value)}} />2 satr</label>
      <label><input type="radio" value="1"  name="radio" onChange={(e) =>{setratingFilter(e.target.value)}} />1 satr</label>
    </div>
    )
  }

  const ViewCart = () => {
    setBrandFilter([])
    setStyle("cadList2");
  }

  const FilterData = async() => {
    debugger
     console.log("check Filter",brandFilter,catgoriesFilter,ratingFilter)   
    const result = product.filter((res) => brandFilter.includes(res.category) || catgoriesFilter.includes(res.brand) && res.rating >= ratingFilter)
    console.log("product", result)
   await setFilterItem(result)
    console.log(filterItem,"with filter")
  }

  const ResetData = () => {
    setBrandFilter([])
    setcatgoriesFilter([])
  }

  const closeDailog = () => {
    setStyle('cadList')
  }

  return (
    <div className="App">

      <div className="App-header">    
      <div className="container">
        <div className="row">
          <div className="col-md-3 ">
            <h3>Select Categories</h3>
           <div className="side_bar">  {categoriesMap()} </div>
           <h3>Select Brands</h3>
           <div className="side_bar">   {brandsMap()}</div>
           <h3>Rating Brands</h3>
           <div>  {ratingStar()}</div>
           <div className="side_bar">
            <a className="btn btn-primary mb-3" style={{marginRight:'10px'}} onClick={() =>{FilterData()}}>Apply Filter</a>
          </div>
          </div>
          <div className="col-md-9">
            <div className="row">
          {productMapHandle()}
          </div>
          </div> 
          <a className="btn btn-primary mb-3 viewRightBtn" onClick={() =>{ViewCart()}}>View cart</a>
          <div className="viewBtn">
            <div className={style}>
              <button  className="closeBtn" onClick={() => closeDailog()}>close</button>
              {addItemHandler()}</div>
          
            </div>     
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
