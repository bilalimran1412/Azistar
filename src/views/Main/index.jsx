import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../components/Main';
import BotBuilder from '../canvas';
import LiveChat from '../LiveChat/index'
import Assigned from '../../pages/assigned'
import Unassigned from '../../pages/unassigned'
import LiveBot from '../../pages/livebot'
import PlayGround from '../../pages/playground'
import Solved from '../../pages/solved'
import DataSources from '../../pages/data-source'
import SignIn from '../../pages/login'
import SignUp from '../../pages/signup'
import GetDataSource from '../../pages/getdatasource'

function MainApp() {
  return (
    <Routes>
      <Route path='/*' element={<MainLayout />} />
      {/* <Route path='/' element={<BotBuilder />} /> */}
      <Route path='/bot/builder/:id' element={<BotBuilder />} />
      <Route path='/live-chat' element={<LiveChat />} />
      <Route path='/assigned' element={<Assigned />} />
      <Route path='/unassigned' element={<Unassigned />} />
      <Route path='/livebot' element={<LiveBot />} />
      <Route path='/play-ground' element={<PlayGround />} />
      <Route path='/solved' element={<Solved />} />
      <Route path='/data-sources' element={<DataSources />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/data-sources/added' element={<GetDataSource />} />
    </Routes>
  );
}

export default MainApp;
