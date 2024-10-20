import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaComments, FaPlay, FaUser, FaClipboardList, FaHome } from 'react-icons/fa';
import '../../views/Styles/sidebar.css';

const Sidebar = ({ onSubmenuToggle }) => {
    const location = useLocation();
    const [isInboxOpen, setInboxOpen] = useState(false);
    const [isPlaygroundOpen, setPlaygroundOpen] = useState(false);

    useEffect(() => {
        const inboxPaths = ['/unassigned', '/assigned', '/solved'];
        const playgroundPaths = ['/data-sources', '/play-ground', '/data-sources/added', '/suggestions'];

        // Check if the current path matches any submenu paths
        if (inboxPaths.includes(location.pathname)) {
            setInboxOpen(true);
            setPlaygroundOpen(false);
            onSubmenuToggle(true);
        } else if (playgroundPaths.includes(location.pathname)) {
            setPlaygroundOpen(true);
            setInboxOpen(false);
            onSubmenuToggle(true);
        }
    }, [location.pathname, onSubmenuToggle]);

    const handleInboxToggle = (event) => {
        event.stopPropagation();
        const newInboxState = !isInboxOpen;
        setInboxOpen(newInboxState);
        setPlaygroundOpen(false);
        onSubmenuToggle(newInboxState);
    };

    const handlePlaygroundToggle = (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        const newPlaygroundState = !isPlaygroundOpen;
        setPlaygroundOpen(newPlaygroundState);
        setInboxOpen(false); // Close Inbox submenu
        onSubmenuToggle(newPlaygroundState);
    };

    return (
        <div className='sidebarlayout'>
            <div className='logo'>
                <h2>My App</h2>
            </div>
            <ul className='menu'>
                <li>
                    <Link to="/" className={`menuItem ${location.pathname === '/' ? 'active' : ''}`}>
                        <FaHome /> Canvas
                    </Link>
                </li>
                <li className='menuItem' onClick={handleInboxToggle}>
                    <FaEnvelope /> Inbox
                    <div className={`submenu ${isInboxOpen ? 'open' : ''}`}>
                        <div className='sub_menu_hdr'>
                            <h2>Inbox</h2>
                        </div>
                        <ul>
                            <li>
                                <Link to="/unassigned" className={`submenuItem ${location.pathname === '/unassigned' ? 'active' : ''}`}>
                                    <FaClipboardList /> Unassigned
                                </Link>
                            </li>
                            <li>
                                <Link to="/assigned" className={`submenuItem ${location.pathname === '/assigned' ? 'active' : ''}`}>
                                    <FaClipboardList /> Assigned
                                </Link>
                            </li>
                            <li>
                                <Link to="/solved" className={`submenuItem ${location.pathname === '/solved' ? 'active' : ''}`}>
                                    <FaClipboardList /> Solved
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to="/live-chat" className={`menuItem ${location.pathname === '/live-chat' ? 'active' : ''}`}>
                        <FaComments /> Live Chat
                    </Link>
                </li>
                <li className='menuItem' onClick={handlePlaygroundToggle}>
                    <FaPlay /> Playground
                    <div className={`submenu ${isPlaygroundOpen ? 'open' : ''}`}>
                        <div className='sub_menu_hdr'>
                            <h2>Lyro AI Chatbot</h2>
                        </div>
                        <ul>
                            <li>
                                <Link to="/data-sources" className={`submenuItem ${location.pathname === '/data-sources' ? 'active' : ''}`}>
                                    <FaPlay /> Data Source
                                </Link>
                            </li>
                            <li>
                                <Link to="/suggestions" className={`submenuItem ${location.pathname === '/suggestions' ? 'active' : ''}`}>
                                    <FaPlay /> Suggestions
                                </Link>
                            </li>
                            <li>
                                <Link to="/play-ground" className={`submenuItem ${location.pathname === '/play-ground' ? 'active' : ''}`}>
                                    <FaPlay /> Playground
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to="/signIn" className={`menuItem ${location.pathname === '/signIn' ? 'active' : ''}`}>
                        <FaUser /> Sign In
                    </Link>
                </li>
                <li>
                    <Link to="/signup" className={`menuItem ${location.pathname === '/signup' ? 'active' : ''}`}>
                        <FaUser /> Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
