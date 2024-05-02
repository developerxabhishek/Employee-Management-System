import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AllUsers = () => {
  const [user, setUser] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();
  const toggleClass = () => {
    setIsActive(!isActive); // Toggle the state
  };
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getuser");
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    try {
       await axios.delete(
        `http://localhost:5000/api/user/deleteuser/${taskId}`
      );
      toast.success("User deleted successfully");
      toggleClass();
      getUser();
    } catch (err) {
      console.log(err);
    }
  };
  if (isAdmin) {
    return (
      <>
        <div className="alltaskdiv">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => {
                return (
                  <tr>
                    <td data-column="S.No">{index + 1}</td>
                    <td data-column="Name">{user.name}</td>
                    <td data-column="Title">{user.title}</td>
                    <td data-column="Email">{user.email}</td>
                    <td data-column="Admin">{user.isAdmin.toString()}</td>
                    <td
                      data-column="Action"
                      // onClick={() => {
                      //   deleteUser(user._id);
                      // }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <MdDelete
                        style={{ color: "red", fontSize: "25px" }}
                        onClick={() => {
                          setTaskid(user._id);
                          toggleClass();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className={isActive ? "confirmation-box" : "confirmation-box-hide"}
          >
            <h2>Confirm Please</h2>
            <hr size="1" color="brown" />
            <p>Do you Really want to Delete this User ? </p>

            <div className="confirmation-box-buttons">
              <button style={{ backgroundColor: "green" }} onClick={deleteUser}>
                Yes
              </button>
              <button style={{ backgroundColor: "red" }} onClick={toggleClass}>
                No
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    Navigate("/");
  }
};

export default AllUsers;
