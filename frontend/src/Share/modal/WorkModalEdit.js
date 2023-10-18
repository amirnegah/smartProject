import React, { useState } from 'react';
import styles from './WorkModalEdit.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editing } from '../../store/workSlice'
const WorkModalEdit = (props) => {
  const startDate = new Date(props.data.start);
  const endDate = new Date(props.data.end);

  // Format the dates as "YYYY-MM-DD" strings
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  const dispatch=useDispatch();
  const id=useSelector(u=>u.user.user).id;
  const [formData, setFormData] = useState({
    id:id,
    work_id:props.data.id.$oid,
    position: props.data.position,
    company: props.data.company,
    start: formattedStartDate,
    end: formattedEndDate,
    duties: props.data.duties, // Join duties array with a period and space
  });
  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the changed value
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const addHandler=async()=>{
    const response= await fetch("/editwork",{
      method: "PUT",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const result= await response.json();
    console.log(result)
    dispatch(editing({id:props.data.id.$oid,updatedWork:formData}));
  }
  return (
    <div className={styles.modalcontainer}>
      <h3>Work Experience</h3>
      <div className={styles.inputcontainer}>
        <label>Job Title</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Job Title"
          name="position" // Add name attribute for identification
          value={formData.position}
          onChange={handleInputChange} // Attach onChange handler
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Company</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Start</label>
        <input
          className={styles.input}
          placeholder="Company"
          name="start"
          value={formData.start}
          type="date"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Finish</label>
        <input
          className={styles.input}
          placeholder="Company"
          name="end"
          value={formData.end}
          type="date"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Description</label>
        <textarea
          name="duties"
          value={formData.duties}
          onChange={handleInputChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={addHandler}>Add Work</button>
    </div>
  );
};

export default WorkModalEdit;