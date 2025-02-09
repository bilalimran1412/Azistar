import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Loader from '../Loader/Loader';
import Section from 'views/Lyro/Configure/Items/Section';

function PopupFormCSVFile({ closeForm, onSubmit }) {
    const [url, setUrl] = useState(['']);
    const [showLoader, setShowLoader] = useState(false);
    const [activeTab, setActiveTab] = useState("priority");
    const [file, setFile] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            onSubmit(url);
            closeForm();
        }, 3000);

    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    return (
        <div className="drop_dwn_form upload_url_scrap_data">
            <div className="inr_drop_dn_frm">
                <div className="frm-outer">
                    {/* Header */}
                    <div className="hdr_form">
                        <div className="title_form">
                            <h2>
                                Import Q&As from .CSV file
                            </h2>
                            <p>Add your questions and answers in the sheet. Upload .CSV file to feed Lyro with knowledge or download our sample to prepare your file.</p>
                            <div class="css-1dgwj5h e1l5a2a40">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="default" className="css-1jraybv e11k6mr30" style={{ minwidth: '24px', minheight: '24px' }}>
                                    <path fill="none" d="M0 0h24v24H0z"></path><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path></svg>
                                <p className="css-17dr1mu eimqq0f0">The file must contain two columns: 'Question' and 'Answer'. Both should be brief. Use the attached example as a starting point for your file.
                                    <a href="/data-sources">Download sample </a>
                                </p>
                            </div>
                            <div className="icon_close" onClick={closeForm}>
                                <MdClose />
                            </div>
                        </div>

                    </div>


                    {/* Form */}
                    <div className="form_show csvffile url_sub_form css-tulmkk ebwkkwi1">
                        {!file ? (
                            // Initial Upload Area
                            <div
                                className="css-1ykj3j8 e1fjvpw20"
                                onClick={() => document.getElementById("fileInput").click()}
                                style={{ cursor: "pointer" }}
                            >
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".csv"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="subdued"
                                    className="css-2eu3wi e11k6mr30"
                                    style={{ minWidth: "40px", minHeight: "40px" }}
                                >
                                    <path d="M11 16V7.85l-2.6 2.6L7 9l5-5 5 5-1.4 1.45-2.6-2.6V16zm-5 4q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 18v-3h2v3h12v-3h2v3q0 .824-.587 1.413A1.93 1.93 0 0 1 18 20z"></path>
                                </svg>
                                <div className="css-qolhr1 e1fjvpw20">
                                    <p className="css-g9kwll eimqq0f0">
                                        <span color="primary" className="css-bgw5wb eimqq0f0">Browse</span>{" "}
                                        or drag &amp; drop it here
                                    </p>
                                    <p color="subdued" className="css-rsq3wg eimqq0f0">
                                        Accepts .CSV files up to 0.5 MB in size and 500 entries. <br />{" "}
                                        (See sample below).
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // File Display Area
                            <div className="css-qolhr1 e1fjvpw20 uploaded_file">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="success" className="css-p10mh e11k6mr30" style={{minwidth: '40px', minheight: '40px'}}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path></svg>
                                <p className="css-g9kwll eimqq0f0">
                                    Uploaded File: <strong>{file.name}</strong>
                                </p>
                                <button
                                    className="remove-btn"
                                    onClick={handleRemoveFile}
                                    style={{
                                        marginTop: "10px",
                                        padding: "5px 10px",
                                        background: "#ff4d4f",
                                        color: "#fff",
                                        border: "none",
                                        cursor: "pointer",
                                        borderRadius: "4px",
                                    }}
                                >
                                    Remove File
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='csvffile'>
                        <h3>How should we proceed if the same Q&As are found?</h3>
                        <div className='css-145840m e1fjvpw20'>

                            <label className='css-1hgkhkn e8tcj2j0'>
                                <input type='radio' value='Import new and replace duplicated Q&As with CSV content' />
                                <span>Import new and replace duplicated Q&As with CSV content</span>
                            </label>
                            <label className='css-1hgkhkn e8tcj2j0'>
                                <input type='radio' value='Import new and replace duplicated Q&As with CSV content' />
                                <span>Import new and skip duplicated Q&As from CSV file</span>
                            </label>

                        </div>
                    </div>
                    <div className="submit_btn">
                        <button className="btn" type="submit" disabled={showLoader}>
                            {showLoader ? "Uploading..." : "Import"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupFormCSVFile;