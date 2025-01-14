import React, { useState } from 'react';
import styles from './EducationModalEdit.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editing } from '../../store/educationSlice';
import axios from 'axios';

const EducationModalEdit = ({ data,backdropHandler }) => {
  // Create a state variable to hold the form data
  
  const startDate = new Date(data.start);
  const endDate = new Date(data.finish);
  const dispatch=useDispatch();
  const id=useSelector(u=>u.user.user).id;
  // Format the dates as "YYYY-MM-DD" strings
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    id:id,
    _id:data._id.$oid,
    school: data.school || '', // Initialize with the data from props
    degree: data.degree || '',
    major: data.major || '',
    start: formattedStartDate || '',
    finish: formattedEndDate || '',
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

  // Handle form submission or data saving
  const handleSubmit = async() => {
    // Here, you can access the formData object, which contains the updated values
    axios.defaults.baseURL = 'http://127.0.0.1:5000';
    const response = await axios.put('/api/editeducation', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {status,code} = response.data;
    if (code === 200 && status) {
    dispatch(editing({id:data._id.$oid,updatedEdc:formData}));
    backdropHandler();
    }
    // You can perform further actions like sending the data to an API or updating state in a parent component.
  };

  return (
    <div className={styles.modalcontainer}>
      <h3>Education</h3>
      <div className={styles.inputcontainer}>
        <label>School</label>
        <input
          className={styles.input}
          type="text"
          placeholder="School"
          name="school"
          value={formData.school}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Degree</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Degree"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Major</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Major"
          name="major"
          value={formData.major}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputcontainer}>
        <label>Start</label>
        <input
          className={styles.input}
          placeholder="Start Date"
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
          placeholder="Finish Date"
          name="finish"
          value={formData.finish}
          type="date"
          onChange={handleInputChange}
        />
      </div>
      <button className={styles.btnAdd} onClick={handleSubmit}>
        Add Education
      </button>
    </div>
  );
};

export default EducationModalEdit;
