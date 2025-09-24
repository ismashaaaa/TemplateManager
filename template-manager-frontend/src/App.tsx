import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TemplatesPage from "../src/components/pages/TemplatesPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Template Management System
                </h1>
              </div>
              <nav className="flex space-x-8">
                <a
                  href="/"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Темплейти
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<TemplatesPage />} />
            <Route path="/templates" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-gray-50 border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2025 Template Management System.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
