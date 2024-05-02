import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
const AllTasks = () => {
  const [task, setTask] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [taskId, setTaskid] = useState("");
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.isAdmin);
  const Navigate = useNavigate();
  const toggleClass = () => {
    setIsActive(!isActive); // Toggle the state
  };

  const getTask = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/task/gettask");
      console.log(res.data);
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTask();
  }, []);

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/task/deletetask/${taskId}`
      );
      toggleClass();
      // console.log(res.data);
      getTask();
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
                <th>Task Title</th>

                <th>Due Date</th>

                <th>Status</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {task.map((key, index) => {
                return (
                  <tr>
                    <td data-column="S.No">{index + 1}</td>
                    <td data-column="Task Title">{key.title}</td>

                    <td data-column="Due Date">{key.enddate}</td>

                    <td data-column="Status">{key.status}</td>

                    <td data-column="Action">
                      <MdDelete
                        style={{ color: "red", cursor: "pointer" }}
                        fontSize="25px"
                        onClick={() => {
                          setTaskid(key._id);
                          toggleClass();
                        }}
                      />
                      <CiEdit
                        style={{
                          color: "blue",
                          fontSize: "25px",
                          marginLeft: "30px",
                          cursor: "pointer",
                          fontWeight: "700",
                        }}
                        onClick={() => {
                          navigate("/admin/updatetask/" + key._id);
                        }}
                      />
                      <FaEye
                        style={{
                          color: "green",
                          fontSize: "25px",
                          marginLeft: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/admin/taskdetail/" + key._id);
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
            <p>Do you Really want to Delete this task ? </p>

            <div className="confirmation-box-buttons">
              <button style={{ backgroundColor: "green" }} onClick={deleteTask}>
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
  } else navigate("/");
};

export default AllTasks;
