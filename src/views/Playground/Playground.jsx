import React, { useState, useEffect } from 'react';
import Chatbot from '../LiveChat/ChatBot';
import '../LiveChat/live-chat.css';
import './playground.css';

const Playground = () => {
    const [patterns, setPatterns] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchIntents = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/chat/intents');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const flattenedPatterns = data.map(intent => intent.patterns).flat(); // Flatten the patterns array
                setPatterns(flattenedPatterns);
            } catch (error) {
                console.error('Error fetching intents:', error);
            }
        };

        fetchIntents();
    }, []);

    const handleShowMore = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + itemsPerPage, patterns.length));
    };

    const handleShowPrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
    };

    const displayedPatterns = patterns.slice(0, currentIndex);

    return (
        <div className='main-data-sources'>
            <div className='hdr_st_so hdr_deta'>
                <div>
                    <h2>Play Ground</h2>
                </div>
                <a href='/user-message'>
                    <button className='add_new_deta'>
                        Your Chat
                    </button>
                </a>
            </div>
            <div className='playground mn-box-select'>
                <div className='inr_dat_box'>
                    <div className='chat_bot_playground'>
                        <Chatbot />
                    </div>
                    <div className='playground_context'>
                        <h4>Test Azister with your knowledge</h4>
                        <p>Type a question or try following examples to see how Azister responds. Feel free, test questions do not count toward the Azister conversations limit.</p>
                        <ul>
                            {displayedPatterns.map((pattern, index) => (
                                <li key={index}>{pattern}</li>
                            ))}
                        </ul>

                        {currentIndex < patterns.length && (
                            <button type="button" onClick={handleShowMore} className="btn btn-new btn-size-l btn-primary undefined">
                                <span>Show more</span>
                            </button>
                        )}
                        
                        {currentIndex > itemsPerPage && (
                            <button type="button" onClick={handleShowPrevious} className="btn btn-new btn-size-l btn-primary undefined">
                                <span>Show previous</span>
                            </button>
                        )}

                        <div className="css-1dgwj5h e1l5a2a40">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="default"
                                className="css-1jraybv e11k6mr30"
                                style={{ minWidth: '24px', minHeight: '24px' }}
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
                            </svg>
                            <p className="css-17dr1mu eimqq0f0">
                                To enhance Azister response quality and efficiency, keep adding more knowledge.{' '}
                                <a href="/data-sources">Add more knowledge</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playground;
