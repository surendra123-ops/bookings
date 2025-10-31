import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExperienceProvider } from './context/ExperienceContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ExperienceProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <div className="min-h-screen bg-gray-50 overflow-x-hidden flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/experience/:id" element={<DetailsPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/result" element={<ResultPage />} />
                </Routes>
              </main>
              <ToastContainer />
            </div>
          </Router>
        </ExperienceProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
