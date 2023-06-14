import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResultNav from './ResultNav';
import '../styles/styles.css';
const Report = (props) => {
  const location = useLocation();
  let userId = location.state.ids;
  const [displaymessage, setDisplaymessage] = useState('');
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
      <br />
      <form onSubmit={handleSubmit}>
        <div className='idDisplay'>
          <label for='id'>Applicantion ID</label>
          <input
            className='form-control'
            type='number'
            name='id'
            id='id'
            value={formData.id}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className='container'>
          <div className='rows row'>
            <div className='col-lg-6 col-md-6'>
              <table class='table table-striped'>
                <thead class='thead-light'>
                  <tr>
                    <th scope='col'>Documents</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>Income Info</th>
                    <td>
                      <select
                        name='incomeInfo'
                        value={formData.incomeInfo}
                        id='id'
                        onChange={handleChange}
                      >
                        <option value='null'>select Status</option>
                        <option value='approve'>Approve</option>

                        <option value='reject'>Reject</option>

                        <option value='pending'>Pending</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className='form-control'
                        id='idc'
                        type='text'
                        name='incomeDesc'
                        value={formData.incomeDesc}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Asset Info</th>
                    <td>
                      <select
                        name='assetInfo'
                        value={formData.assetInfo}
                        onChange={handleChange}
                      >
                        <option value='null'>select Status</option>
                        <option value='approve'>Approve</option>

                        <option value='reject'>Reject</option>

                        <option value='pending'>Pending</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type='text'
                        name='assetDesc'
                        value={formData.assetDesc}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Property Info</th>
                    <td>
                      <select
                        name='propertInfo'
                        value={formData.propertInfo}
                        onChange={handleChange}
                      >
                        <option value='null'>select Status</option>
                        <option value='approve'>Approve</option>

                        <option value='reject'>Reject</option>

                        <option value='pending'>Pending</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type='text'
                        name='propertDesc'
                        value={formData.propertDesc}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Debt Info</th>
                    <td>
                      <select
                        name='debtInfo'
                        value={formData.debtInfo}
                        onChange={handleChange}
                      >
                        <option value='null'>select Status</option>
                        <option value='approve'>Approve</option>

                        <option value='reject'>Reject</option>

                        <option value='pending'>Pending</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type='text'
                        name='debtDesc'
                        value={formData.debtDesc}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Legal Opinion</th>
                    <td>
                      <select
                        name='legalInfo'
                        value={formData.legalInfo}
                        onChange={handleChange}
                      >
                        <option value='null'>select Status</option>
                        <option value='approve'>Approve</option>

                        <option value='reject'>Reject</option>

                        <option value='pending'>Pending</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type='text'
                        name='legalDesc'
                        value={formData.legalDesc}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Final Status</th>
                    <td>
                      <select
                        name='finaldesc'
                        value={formData.finaldesc}
                        onChange={handleChange}
                      >
                        <option value='null'>select Status</option>
                        <option value='approve'>Approve</option>

                        <option value='reject'>Reject</option>

                        <option value='pending'>Pending</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className='form-control'
                        type='text'
                        name='finalresult'
                        value={formData.finalresult}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className='btn btn-primary'
                type='submit'
                onClick={() => setDisplaymessage('status updated')}
              >
                Submit
              </button>
              &nbsp;&nbsp;{displaymessage}
            </div>
            <div className='col-lg-5 '>
              <table className=' table-margin'>
                <thead>
                  <tr className=' table-margin'>
                    <th className=' table-margin'>Parameters</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(tableData).map(([param, status]) => (
                    <tr key={param} className='trs'>
                      <td className='tds  table-margin'>{param}</td>
                      <td className='tds  table-margin'>{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Report;
