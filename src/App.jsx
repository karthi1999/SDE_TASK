import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLoader } from './components';

function App() {

    const DirectoryPage = React.lazy(() => import('./components/pageComponents/Directory.page'));
    const UserProfilePage = React.lazy(() => import('./components/pageComponents/UserProfile.page'));
    const ErrorMessage = React.lazy(() => import('./components/pageComponents/ErrorMessage.page'));

    return (
        <Router>
            <Suspense
                fallback={<AppLoader />}
            >
                <Routes>
                    <Route index={true} path="/" element={<Navigate to={`/users`} />} />
                    <Route path="/users" element={<DirectoryPage />} />
                    <Route path="/users/:userId" element={<UserProfilePage />} />
                    <Route path='*' element={<ErrorMessage />} />;
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
