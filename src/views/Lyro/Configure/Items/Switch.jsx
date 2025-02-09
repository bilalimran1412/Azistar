import React from 'react';

const Switch = ({ checked, onChange, label, info, Icon }) => {
    return (
        <label className="switch">
            <span className='icon'>{Icon}</span>
            <p>{label} <br/>
            {info && <span className="switch-label">{info}</span>}</p>
            <input
                type="checkbox"
                role="switch"
                aria-label={label}
                checked={checked}
                onChange={onChange}
                className="switch-input"
            />
            <div className={`switch-slider ${checked ? 'checked' : ''}`}></div>
        </label>
    );
};

export default Switch;
