import React, {useState } from 'react'
import "./Add.css"
import {assets} from "../../assets/assets"
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({Url}) => {
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
      name:"",
      description:"",
      price:"",
      category:"Salad"
    })

 //get all data through onchangehandler
 const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data =>({...data,[name]:value}))
 }

 const onSubmitHandler = async (e) =>{
   e.preventDefault();
   const formData = new FormData();
   formData.append("name",data.name);
   formData.append("description",data.description);
   formData.append("price",Number(data.price));
   formData.append("category",data.category);
   formData.append("image",image);
   const response = await axios.post(`${Url}/api/food/add`,formData);
   if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"salad"
      }),
      setImage(false);
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
  return (
    <div className="add-containers">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_icon} alt="upload" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
          <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here!' />
          </div>
          <div className="add-product-des flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write a Containt'></textarea>
          </div>
          <div className='add-category-price'onChangeHandler>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="salad">Salad</option>
              <option value="roll">Roll</option>
              <option value="deserts">Deserts</option>
              <option value="sandwich">Sandwich</option>
              <option value="cake">Cake</option>
              <option value="pure-veg">Pure-Veg</option>
              <option value="Non-veg">Non-Veg</option>
              <option value="pasta">Pasta</option>
              <option value="noodels">Noodels</option>
              <option value="salad">Salad</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number" onChange={onChangeHandler} value={data.price} name='price' placeholder='₹120' />
          </div>
         </div>
         <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add