import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const [input, setInput] = useState({});
  const [user, setUser] = useState([]);
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/task/settask", input)
        .then((response) => {
          toast.success("Task Added Successfully");
          setInput("");
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isAdmin) {
    return (
      <div className="background_container">
        <section className="add-employee-section">
          <h3>Add Task</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label>Task Title </label>
              <input
                type="text"
                name="title"
                minLength="1"
                maxLength="50"
                value={input.title}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label>Assigned to </label>
              <br />
              <select
                name="assign"
                id="isAdmin"
                value={input.assign}
                onChange={handleChange}
              >
                {user.map((user) => (
                  <option value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="input_container">
              <label>Priority</label>
              <br />
              <select
                name="priority"
                id="isAdmin"
                value={input.priority}
                onChange={handleChange}
              >
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="input_container">
              <label>Status</label>
              <br />
              <select
                name="status"
                id="isAdmin"
                value={input.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="input_container">
              <label>Start date</label>
              <input
                type="date"
                name="startdate"
                value={input.startdate}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label>End Date</label>
              <input
                type="date"
                name="enddate"
                value={input.enddate}
                onChange={handleChange}
              />
            </div>

            {/* {error && <p className="error">{error}</p>} */}
            <div className="btn_container">
              <button className="btn" onClick={handleSubmit}>
                {/* {loading ? "Creating ..." : "Register"} */}
                Add Task
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  } else {
    Navigate("/");
  }
};

export default AddTask;
