import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [viewName, setViewName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [wishlistErrorMessage, setWishlistErrorMessage] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [applicantName, setApplicantName] = useState('');

  const [loanRange, setLoanRange] = useState({ min: '', max: '' });

  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const [sortBy, setSortBy] = useState('');

  const [wishlist, setWishlist] = useState([]);

  const [wishlistName, setWishlistName] = useState('');
  const [applicantNames, setApplicantNames] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [wishview, setWishview] = useState([]);

  useEffect(() => {
    axios

      .get('https://riskanalysis.azurewebsites.net/Mortgage/GetAllValues')

      .then((response) => {
        setTableData(response.data);

        setData(response.data);

        setFilteredData(response.data);
        const names = [
          ...new Set(response.data.map((entry) => entry.applicantName)),
        ];

        setApplicantNames(names);
      })

      .catch((error) => {
        console.error('Error retrieving table data:', error);

        // Handle the error gracefully (e.g., show an error message)
      });

    axios
      .get(
        'https://riskanalysis.azurewebsites.net/mortgage/GetWishlistnamesonly'
      )
      .then((response) => {
        setWishlistName(response.data);
      });
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('filteredData');

    if (storedData) {
      setFilteredData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
  }, [filteredData]);

  const handleFilterChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedFilters(selectedOptions);
  };

  const handleClearFilter = () => {
    setApplicantName('');

    setLoanRange({ min: '', max: '' });

    setDateRange({ start: '', end: '' });

    setSelectedFilters([]);

    setFilteredData(tableData); // Reset filteredData to original tableData
  };

  const handleApplyFilter = () => {
    let filteredResult = [...data]; // Create a copy of the data array

    // Filter by applicant name

    if (applicantName.trim() !== '') {
      filteredResult = filteredResult.filter((entry) =>
        entry.applicantName.toLowerCase().includes(applicantName.toLowerCase())
      );
    }

    // Filter by loan range

    if (loanRange.min !== '' && loanRange.max !== '') {
      filteredResult = filteredResult.filter(
        (entry) =>
          entry.expectedLoan >= Number(loanRange.min) &&
          entry.expectedLoan <= Number(loanRange.max)
      );
    }

    // Filter by date range

    if (dateRange.start !== '' && dateRange.end !== '') {
      filteredResult = filteredResult.filter((entry) => {
        const startDate = JSON.stringify(new Date(dateRange.start));

        const endDate = JSON.stringify(new Date(dateRange.end));

        const entryDate = JSON.stringify(new Date(entry.date));

        return entryDate >= startDate && entryDate <= endDate;
      });
    }

    setFilteredData(filteredResult);
  };

  const handleSortByChange = (e) => {
    const selectedSortBy = e.target.value;

    if (selectedSortBy === '') {
      setSortBy('');

      setFilteredData(data); // Set filtered data to original unsorted data
    } else {
      setSortBy(selectedSortBy);
    }
  };

  useEffect(() => {
    let sortedResult = [...filteredData];

    if (sortBy === 'expectedLoan-asc') {
      sortedResult.sort((a, b) => a.expectedLoan - b.expectedLoan);
    } else if (sortBy === 'expectedLoan-desc') {
      sortedResult.sort((a, b) => b.expectedLoan - a.expectedLoan);
    } else if (sortBy === 'date-asc') {
      sortedResult.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      sortedResult.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'applicantName') {
      sortedResult.sort((a, b) =>
        a.applicantName.localeCompare(b.applicantName)
      );
    }

    setFilteredData(sortedResult);
  }, [sortBy]);

  const handleAddToWishlist = () => {
    const sortedFilteredTableKey = JSON.stringify({
      filterType: selectedFilters,

      sortBy: sortBy,
    }); // Store filter type, sort by type, and sorted data in key

    if (!viewName) {
      console.log('Invalid wishlist name.');

      setWishlistErrorMessage('Invalid wishlist name.');

      return;
    }

    const existingWishlist = wishlist.find(
      (item) => item.key === sortedFilteredTableKey
    );

    if (existingWishlist) {
      console.log('The same table is already in the wishlist.');

      setWishlistErrorMessage('The same table is already in the wishlist.');

      return;
    }

    const existingWishlistName = wishlist.find(
      (item) => item.name === viewName
    );

    if (existingWishlistName) {
      console.log(
        `A wishlist with the name "${viewName}" already exists. Please enter a different name.`
      );

      setWishlistErrorMessage(
        `A wishlist with the name "${viewName}" already exists. Please enter a different name.`
      );

      return;
    }

    const updatedWishlist = [
      ...wishlist,

      {
        name: viewName,

        key: sortedFilteredTableKey,
      },
    ];

    setWishlist(updatedWishlist);

    // Send the wishlist data to the API

    const wishlistData = {
      wishlistName: viewName,

      name: applicantName,

      minRange: Number(loanRange.min),

      maxRange: Number(loanRange.max),

      startdate: dateRange.start,

      enddate: dateRange.end,

      filterType: selectedFilters,

      sortBy: sortBy,
    };

    axios

      .post(
        'https://riskanalysis.azurewebsites.net/Mortgage/AddWishView',

        wishlistData
      )

      .then((response) => {
        console.log('Wishlist Added:', response.data);

        setWishlistErrorMessage('Wishlist Added!');

        // Optionally, you can update the local state or perform any other necessary actions
      })

      .catch((error) => {
        console.error('Error saving wishlist', error);

        setWishlistErrorMessage('Error saving wishlist!');

        // Handle the error gracefully (e.g., show an error message)
      });
  };
  function passValues(ids) {
    navigate('/report', { state: { ids } });
  }
  function displaywishview(wishname) {
    axios
      .get(
        `https://riskanalysis.azurewebsites.net/Mortgage/GetFinalWishLists?wishlistname=${wishname}`
      )
      .then((response) => {
        console.log(wishname);
        console.log(response.data[0].minRange);
        setLoanRange({
          ...loanRange,
          min: response.data[0].minRange,
          max: response.data[0].maxRange,
        });
        setDateRange({
          ...dateRange,
          start: response.data[0].startdate,
          end: response.data[0].enddate,
        });
        setApplicantName(response.data[0].name);
        setSortBy(response.data[0].sortBy);
        console.log(loanRange);
      });
    const handleApplyFilter = () => {
      let filteredResult = [...data]; // Create a copy of the data array

      // Filter by applicant name

      if (applicantName.trim() !== '') {
        filteredResult = filteredResult.filter((entry) =>
          entry.applicantName
            .toLowerCase()
            .includes(applicantName.toLowerCase())
        );
      }

      // Filter by loan range

      if (loanRange.min !== '' && loanRange.max !== '') {
        filteredResult = filteredResult.filter(
          (entry) =>
            entry.expectedLoan >= Number(loanRange.min) &&
            entry.expectedLoan <= Number(loanRange.max)
        );
      }

      // Filter by date range

      if (dateRange.start !== '' && dateRange.end !== '') {
        filteredResult = filteredResult.filter((entry) => {
          const startDate = JSON.stringify(new Date(dateRange.start));

          const endDate = JSON.stringify(new Date(dateRange.end));

          const entryDate = JSON.stringify(new Date(entry.date));

          return entryDate >= startDate && entryDate <= endDate;
        });
      }

      setFilteredData(filteredResult);
    };
  }
  return (
    <div className='app'>
      {/* Header */}

      <div className='container'>
        {/* Sidebar */}

        <aside className='sidebar'>
          {/* Filter Section */}

          <div className='filter-section'>
            <h3 className='filter-heading'>FILTERS</h3>

            <div className={`filter-content show`}>
              <div className='filter-group'>
                <label htmlFor='applicantName'>Applicant Name:</label>
                <select
                  id='applicantName'
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                >
                  <option value=''>All</option>

                  {applicantNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='filter-group'>
                <label>Loan Range:</label>

                <input
                  type='number'
                  id='loanRangeMin'
                  value={loanRange.min}
                  onChange={(e) =>
                    setLoanRange({ ...loanRange, min: e.target.value })
                  }
                  placeholder='Min'
                />

                <input
                  type='number'
                  id='loanRangeMax'
                  value={loanRange.max}
                  onChange={(e) =>
                    setLoanRange({ ...loanRange, max: e.target.value })
                  }
                  placeholder='Max'
                />
              </div>

              <div className='filter-group'>
                <label>Date Range:</label>

                <input
                  type='date'
                  id='dateRangeStart'
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />

                <input
                  type='date'
                  id='dateRangeEnd'
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                />
              </div>

              <div className='button-group'>
                <button
                  className='apply-filter-button'
                  onClick={handleApplyFilter}
                >
                  Apply Filter
                </button>

                <button
                  className='clear-filter-button'
                  onClick={handleClearFilter}
                >
                  Clear Filter
                </button>
                <div className='wishlist-label'>
                  <label htmlFor='viewName'></label>

                  <input
                    type='text'
                    id='viewName'
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    placeholder='Enter the wishlist name'
                  />
                </div>

                {wishlistErrorMessage && (
                  <p className='wishlist-error'>{wishlistErrorMessage}</p>
                )}

                {/* Add to Wishlist Button */}

                <button
                  className='addtowishlist-button'
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </button>

                {/* Add to Wishlist Button */}

                {/* <button
                  className='addtowishlist-button'
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </button> */}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Section */}

        <main className='main'>
          {/* Sort By Section */}

          <div className='sort-by sort-by-dropdown'>
            <label htmlFor='sortBy'>Sort By:</label>

            <select id='sortBy' value={sortBy} onChange={handleSortByChange}>
              <option value=''>None</option>

              <option value='expectedLoan-asc'>
                Expected Loan (Low to High)
              </option>

              <option value='expectedLoan-desc'>
                Expected Loan (High to Low)
              </option>

              <option value='date-asc'>Date (Old to New)</option>

              <option value='date-desc'>Date (New to Old)</option>

              <option value='applicantName'>Applicant's Name</option>
            </select>
          </div>

          {/* Table Section */}

          <div className=''>
            {filteredData.length === 0 ? (
              <div className='no-data'>No data found</div>
            ) : (
              <table className='listview'>
                <thead>
                  <tr>
                    <th>Applicantion ID</th>

                    <th>Applicant's Name</th>

                    <th>Expected Loan</th>

                    <th>Date</th>
                    <th>Analysis Report</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((entry) => (
                    <tr key={entry.appId}>
                      <td>{entry.appId}</td>

                      <td>{entry.applicantName}</td>

                      <td>{entry.expectedLoan}</td>

                      <td>{entry.date}</td>
                      <td>
                        <button onClick={() => passValues(entry.appId)}>
                          Risk analysis
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
        <aside className='sidebars'>
          <center>
            <div>WISHLISTS</div>
          </center>
          {wishlistName.length === 0 ? (
            <div className='no-data'>No data found</div>
          ) : (
            wishlistName.map((entry) => (
              <ul key={entry.name}>
                <li>
                  <a
                    href='#'
                    className='wishview'
                    onClick={() => displaywishview(entry.name)}
                  >
                    {entry.name}
                  </a>
                </li>
              </ul>
            ))
          )}
        </aside>
      </div>
    </div>
  );
};

export default App;
