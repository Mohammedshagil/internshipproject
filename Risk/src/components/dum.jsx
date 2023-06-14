import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResultNav from './ResultNav';
import '../styles/styles.css';
const Report = (props) => {
  const location = useLocation();
  let userId = location.state.ids;

  const [formData, setFormData] = useState({
    id: userId,

    incomeInfo: '',

    incomeDesc: '',

    assetInfo: '',

    assetDesc: '',

    propertInfo: '',

    propertDesc: '',

    debtInfo: '',

    debtDesc: '',

    legalInfo: '',

    legalDesc: '',

    finaldesc: '',

    finalresult: '',
  });

  const [tableData, setTableData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Special handling for dropdown values
    if (
      name === 'incomeInfo' ||
      name === 'assetInfo' ||
      name === 'propertInfo' ||
      name === 'debtInfo' ||
      name === 'legalInfo' ||
      name === 'finaldesc'
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        [`${name}Desc`]: event.target.options[event.target.selectedIndex].text, // Store the selected option text in corresponding desc field
      }));
    } else {
      // For other input fields, update the state normally
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      console.log(formData);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent

    const postData = {
      id: formData.id,

      incomeInfo: formData.incomeInfo,

      incomeDesc: formData.incomeDesc,

      assetInfo: formData.assetInfo,

      assetDesc: formData.assetDesc,

      propertInfo: formData.propertInfo,

      propertDesc: formData.propertDesc,

      debtInfo: formData.debtInfo,

      debtDesc: formData.debtDesc,

      legalInfo: formData.legalInfo,

      legalDesc: formData.legalDesc,

      finaldesc: formData.finaldesc,

      finalresult: formData.finalresult,
    };

    // Send the data to the API

    fetch('https://riskanalysis.azurewebsites.net/Mortgage/AddFinalResult', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(postData),
    })
      .then((response) => response.json())

      .catch((error) => {
        // Handle any error that occurred

        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Fetch the data from the APIhttps://riskanalysis.azurewebsites.net/Mortgage/GetAllValues/99

    fetch(
      `https://riskanalysis.azurewebsites.net/Mortgage/GetAllValues/${userId}`
    )
      .then((response) => response.json())

      .then((data) => {
        // Update the table data state with the fetched data

        setTableData(data);
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <ResultNav />

      <div className='full-page'>
        <div className='contain'>
          <form onSubmit={handleSubmit}>
            <label for='id'>ID:</label>
            <input
              className='form-control'
              type='number'
              name='id'
              id='id'
              value={formData.id}
              onChange={handleChange}
            />

            <label for='id'>Income Info:</label>
            <select
              name='incomeInfo'
              value={formData.incomeInfo}
              id='id'
              onChange={handleChange}
            >
              <option value='approve'>Approve</option>

              <option value='reject'>Reject</option>

              <option value='pending'>Pending</option>
            </select>

            <label for='idc'>Income Description:</label>
            <input
              className='form-control'
              id='idc'
              type='text'
              name='incomeDesc'
              value={formData.incomeDesc}
              onChange={handleChange}
            />

            <label>Asset Info:</label>
            <select
              name='assetInfo'
              value={formData.assetInfo}
              onChange={handleChange}
            >
              <option value='approve'>Approve</option>

              <option value='reject'>Reject</option>

              <option value='pending'>Pending</option>
            </select>

            <label>Asset Description:</label>
            <input
              className='form-control'
              type='text'
              name='assetDesc'
              value={formData.assetDesc}
              onChange={handleChange}
            />

            <label>Property Info: </label>
            <select
              name='propertInfo'
              value={formData.propertInfo}
              onChange={handleChange}
            >
              <option value='approve'>Approve</option>

              <option value='reject'>Reject</option>

              <option value='pending'>Pending</option>
            </select>

            <label>Property Description:</label>
            <input
              className='form-control'
              type='text'
              name='propertDesc'
              value={formData.propertDesc}
              onChange={handleChange}
            />

            <label>Debt Info: </label>
            <select
              name='debtInfo'
              value={formData.debtInfo}
              onChange={handleChange}
            >
              <option value='approve'>Approve</option>

              <option value='reject'>Reject</option>

              <option value='pending'>Pending</option>
            </select>

            <label>Debt Description:</label>
            <input
              className='form-control'
              type='text'
              name='debtDesc'
              value={formData.debtDesc}
              onChange={handleChange}
            />

            <label>Legal Info:</label>
            <select
              name='legalInfo'
              value={formData.legalInfo}
              onChange={handleChange}
            >
              <option value='approve'>Approve</option>

              <option value='reject'>Reject</option>

              <option value='pending'>Pending</option>
            </select>

            <label>Legal Description:</label>
            <input
              className='form-control'
              type='text'
              name='legalDesc'
              value={formData.legalDesc}
              onChange={handleChange}
            />

            <label>Final desc: </label>
            <select
              name='finaldesc'
              value={formData.finaldesc}
              onChange={handleChange}
            >
              <option value='approve'>Approve</option>

              <option value='reject'>Reject</option>

              <option value='pending'>Pending</option>
            </select>

            <label>Final result: </label>
            <input
              className='form-control'
              type='text'
              name='finalresult'
              value={formData.finalresult}
              onChange={handleChange}
            />

            <button type='submit'>Submit</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Parameters</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(tableData).map(([param, status]) => (
              <tr key={param}>
                <td>{param}</td>

                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Report;
