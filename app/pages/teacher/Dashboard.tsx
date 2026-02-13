import { Routes, Route, Navigate } from 'react-router';
import { TeacherSidebar } from '../../components/TeacherSidebar';
import Overview from './Overview';
import MyVideos from './MyVideos';
import VideoDetails from './VideoDetails';
import Earnings from './Earnings';
import UploadVideo from './UploadVideo';
import Settings from './Settings';

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="my-videos" element={<MyVideos />} />
          <Route path="video/:id" element={<VideoDetails />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="upload" element={<UploadVideo />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/teacher/overview" replace />} />
        </Routes>
      </div>
    </div>
  );
}
