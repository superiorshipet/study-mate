import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChooseRole from "./pages/ChooseRole";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentCatalog from "./pages/student/Catalog";
import CourseDetails from "./pages/student/CourseDetails";
import Payment from "./pages/student/Payment";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import EnterCode from "./pages/student/EnterCode";
import WatchVideo from "./pages/student/WatchVideo";
import StudentMyVideos from "./pages/student/MyVideos";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/choose-role",
    Component: ChooseRole,
  },
  {
    path: "/student/login",
    Component: StudentLogin,
  },
  {
    path: "/teacher/login",
    Component: TeacherLogin,
  },
  {
    path: "/teacher/*",
    Component: TeacherDashboard,
  },
  {
    path: "/student/catalog",
    Component: StudentCatalog,
  },
  {
    path: "/student/course/:id",
    Component: CourseDetails,
  },
  {
    path: "/student/payment/:id",
    Component: Payment,
  },
  {
    path: "/student/payment-success/:id",
    Component: PaymentSuccess,
  },
  {
    path: "/student/enter-code",
    Component: EnterCode,
  },
  {
    path: "/student/watch/:videoId",
    Component: WatchVideo,
  },
  {
    path: "/student/my-videos",
    Component: StudentMyVideos,
  },
]);
