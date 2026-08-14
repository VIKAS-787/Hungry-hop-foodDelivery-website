import "./List.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

function List({Url}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch List
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to load data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Item
  const removeItem = async (id) => {
    try {
      const response = await axios.delete(`${Url}/api/food/remove/${id}`);

      if (response.data.success) {
        toast.success("Item deleted");
        fetchList(); // refresh list
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting item");
    }
  };

  useEffect(()=>{
    fetchList();
  },[]);


  return (
    <div className="add-list flex-col">
      <h2>All Food List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : list.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img src={`${Url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <img
                src={assets.cross_icon}
                alt="delete"
                onClick={() => removeItem(item._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;