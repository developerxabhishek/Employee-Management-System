import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({});
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
        .post("http://localhost:5000/api/user/register", input)
        .then((response) => {
          toast.success(response.data.message);
        })
        .then(() => {
          setInput({});
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  if (isAdmin) {
    return (
      <div className="background_container">
        <section className="add-employee-section">
          <h3>Add Employee</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label>Name</label>
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="50"
                value={input.name}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
              />
            </div>

            <div className="input_container">
              <label>Make Admin ? </label>
              <br />
              <select
                name="isAdmin"
                id="isAdmin"
                value={input.isAdmin}
                onChange={handleChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div className="input_container">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="show_password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="show_password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            {/* {error && <p className="error">{error}</p>} */}
            <div className="btn_container">
              <button className="btn" onClick={handleSubmit}>
                {/* {loading ? "Creating ..." : "Register"} */}
                Create user
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

export default AddEmployee;
