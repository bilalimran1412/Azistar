import React from 'react';
import { useState } from 'react';
import '../../views/Styles/popup.css';
import DropDownForm from '../../views/LiveChat/DataSource/DropDownForm';
import AddManuallyIntent from '../../views/LiveChat/DataSource/AddManually';
import { MdClose } from 'react-icons/md';
import PopupFormCSVFile from 'views/LiveChat/DataSource/PopupFormCSVFile';

const PopUp = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [showIndentForm, setShowIndentForm] = useState(false);
  const [message, setMessage] = useState('');
  const [activeclass, setActiveClass] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const [ShowCSVFILEForm, setShowCSVFILEForm] = useState(false)

  const displayForm = () => {
    setShowForm(true);
    setMessage('');
    setActiveClass('');
  };

  const closeForm = () => {
    setShowForm(false);
    setMessage('');
    setActiveClass('');
  };

  const closeIndentForm = () => {
    setShowIndentForm(false);
    setMessage('');
    setActiveClass('');
  };

  // Function to handle form submission
  const handleSubmit = async (url) => {
    try {
      const userId = localStorage.getItem('userId');
      const source = 'website';
      const usedBy = 'Used By Lyro';
      const response = await fetch(`${baseURL}/scrap_data/addurl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, userId, source, usedBy }),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        setActiveClass('success_active');
        setMessage('URL submitted successfully');
        setShowForm(false);

        window.location.href = '/data-sources/added';
      } else {
        setActiveClass('error_active');
        setMessage('Failed to submit URL');
      }
    } catch (error) {
      setActiveClass('error_active');
      setMessage('Please try again');
      console.error('error_active');
    } finally {
    }
  };

  const closeCSVFileForm = () => {
    setShowCSVFILEForm(false)
    setMessage('')
    setActiveClass('')
  }


  // Function Indent

  const IntentForm = () => {
    setShowIndentForm(true);
    setMessage('');
  };

  const handleIndentSubmit = async () => {
    setShowIndentForm(false);
    setMessage('Your intent saved');
  };

  const handleCSVFile = () => {
    setShowCSVFILEForm(true)
    setMessage('Your CSV File is Uploaded')
  }

  if (!isOpen) return null;
  return (
    <div className={`popup-overlay ${isOpen ? 'active' : ''}`}>
      <div className='modal-content'>
        <h2>Add More Knowledge</h2>
        <p>Choose how you want toprovide Lyro with Knowledge.</p>
        <div className='mn-box-select'>
          <div className='inr_dat_box'>
            <div className='box_event'>
              <div className='evnt_inr_bx' onClick={displayForm}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  style={{ minWidth: '24px', minHeight: '24px', color: 'blue' }}
                >
                  <path fill='none' d='M0 0h24v24H0z'></path>
                  <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8 8 0 0 1 5.08 16m2.95-8H5.08a8 8 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z'></path>
                </svg>
                <h6>Website URL</h6>
                <p style={{ color: 'gray' }}>
                  Provide the URL of your site to feed Azister with knowledge
                  from it.
                </p>
              </div>

              <div onClick={IntentForm} className='evnt_inr_bx'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  style={{ minWidth: '24px', minHeight: '24px', color: 'blue' }}
                >
                  <path fill='none' d='M0 0h24v24H0z'></path>
                  <path d='M5 3h14c1.1 0 2 .9 2 2v4h-2V5H5v14h5v2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2m2 11h5v-2H7zm0-4h10V8H7zm5 7.583V21h3.417l6.11-6.111q.25-.25.362-.57t.111-.625-.125-.61a2 2 0 0 0-.347-.556L20.5 11.5a1.672 1.672 0 0 0-1.194-.5q-.306 0-.612.111a1.5 1.5 0 0 0-.555.361zm2.722 1.75h-1.055v-1.055l3.389-3.361 1.027 1.027z'></path>
                </svg>
                <h6>Add manually</h6>
                <p style={{ color: 'gray' }}>
                  Manually write your own specific questions.
                </p>
              </div>

              <div onClick={handleCSVFile} className='evnt_inr_bx'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  style={{ minWidth: '24px', minHeight: '24px', color: 'blue' }}
                >
                  <path fill='none' d='M0 0h24v24H0z'></path>
                  <path d='M5 3h14c1.1 0 2 .9 2 2v5h-2V5H5v14h7v2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2m2 11h5v-2H7zm0-4h10V8H7zm6 7 1.425-1.4L16 17.175V12h2v5.175l1.6-1.575L21 17l-4 4z'></path>
                </svg>
                <h6>Import from .CSV files</h6>
                <p style={{ color: 'gray' }}>
                  Add multiple Q&A from .CSV file at once.
                </p>
              </div>
              {/* <div onClick={IntentForm} className='evnt_inr_bx'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  style={{ minWidth: '24px', minHeight: '24px', color: 'blue' }}
                >
                  <path fill='none' d='M0 0h24v24H0z'></path>
                  <path d='M11.117 7.696V21.12H0zm0-4.816A5.559 5.559 0 0 1 0 2.88zm1.832 18.24a5.558 5.558 0 1 1 11.117 0zm0-4.817V2.88h11.12z'></path>
                </svg>
                <h6>Import Zendesk articles</h6>
                <p style={{ color: 'gray' }}>
                  Import knowledge from your Zendesk Help Center Articles.
                </p>
              </div> */}
            </div>
          </div>
        </div>
        {showForm && (
          <DropDownForm closeForm={closeForm} onSubmit={handleSubmit} />
        )}
        {showIndentForm && (
          <AddManuallyIntent
            closeIndentForm={closeIndentForm}
            onSubmit={handleIndentSubmit}
          />
        )}
        {ShowCSVFILEForm && <PopupFormCSVFile closeForm={closeCSVFileForm} onSubmit={handleSubmit}/>}
        <p className={`${activeclass} notify_message`}>{message}</p>
        <div className="icon_close" onClick={onClose}>
          <MdClose />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
