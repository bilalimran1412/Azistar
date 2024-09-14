import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../components/Main';
import BotBuilder from '../canvas';

function MainApp() {
    return (
        <Routes>
            <Route path='/*' element={<MainLayout />} />
            <Route path='/bot/builder/:id' element={<BotBuilder />} />
        </Routes>
    );
}

export default MainApp;
