import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import JurnalListPage from "../pages/JurnalList";
import TeachersPage from "../pages/TeachersPage";
import Error from "../pages/Eror";
import TeacherDetailPage from "../pages/TeacherDetailPage";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import JurnalList from "./Jurnal";
import Teachers from "./Teachers";
import TeacherDetail from "./TeacherDetail";
import { useEffect } from "react";
import JournalDetail from './jurnalDetail/JurnalDetail'
import JurnalDetail2 from "./jurnalDetail/JournalDetail2";
import JurnalSubjectList from "./jurnalSubjects/List";
import SubjectList from "./subjects/SubjectsList";
import SubjectTopicsDetail from "./jurnalSubjects/Detail";
import Profile from "./user/Profile";

function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Страницы без layout */}
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

        
          
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jurnal/list" element={<JurnalList />} />
            <Route path="/teachers/list" element={<Teachers />} />
            <Route path="/teacher/:id/detail" element={<TeacherDetail />} />
            <Route path="/journal/:id/detail" element={<JurnalDetail2 />} />
            <Route path="/subject/list/" element={<JurnalSubjectList/>}/>
            <Route path="/subjects/list/" element={<SubjectList/>}/>
            <Route path="/jurnal/subject/detail/:id" element={<SubjectTopicsDetail/>}/>
            <Route path="/profile" element={<Profile />}/>
          
            
          </Route>

        {/* 404 */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
