import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './tab.css';

const TabComponent = ({ tabs }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = location.pathname.split('/').pop();
    const defaultTab = tabs[0]?.label;
    const activeTabFromURL = tabs.some(tab => tab.label === currentTab) ? currentTab : defaultTab;

    const [activeTab, setActiveTab] = useState(activeTabFromURL);



    const handleTabClick = (tab) => {
        setActiveTab(tab.label);
        if (tab.to) {
            navigate(tab.to);
        }
    };

    return (
        <div className="tab-container">
            <div className="tab-menu">
                {tabs.map(tab => (
                    <div
                        key={tab.label}
                        className={`tab-menu-item ${activeTab === tab.label ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.icon} 
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {/* Render the JSX directly */}
                {tabs.find(tab => tab.label === activeTab)?.content}
            </div>
        </div>
    );
};

export default TabComponent;
