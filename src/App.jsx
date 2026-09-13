
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [screeningData, setScreeningData] = useState({
    image: null,
    previewUrl: null,
    result: null,
    processing: false,
  });


  const handleImageUpload = (file) => {
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setScreeningData((previous) => ({
      ...previous,
      image: file,
      previewUrl,
      result: null,
      processing: false,
    }));

    navigate("/processing");
  };


  const handleScreeningComplete = (result) => {
    setScreeningData((previous) => ({
      ...previous,
      result,
      processing: false,
    }));

    navigate("/result");
  };


  const handleScreeningStart = () => {
    setScreeningData((previous) => ({
      ...previous,
      processing: true,
    }));
  };


  const handleReset = () => {
    if (screeningData.previewUrl) {
      URL.revokeObjectURL(screeningData.previewUrl);
    }

    setScreeningData({
      image: null,
      previewUrl: null,
      result: null,
      processing: false,
    });

    navigate("/upload");
  };


  const handleBackToHome = () => {
    if (screeningData.previewUrl) {
      URL.revokeObjectURL(screeningData.previewUrl);
    }

    setScreeningData({
      image: null,
      previewUrl: null,
      result: null,
      processing: false,
    });

    navigate("/");
  };


  return (
    <div className="app">
      <Navbar />

      <Routes>

      <Route
        path="/"
        element={
          <Welcome
            onStart={() => navigate("/upload")}
          />
        }
      />


      <Route
        path="/upload"
        element={
          <Upload
            image={screeningData.image}
            previewUrl={screeningData.previewUrl}
            onUpload={handleImageUpload}
            onStartProcessing={() => {
              handleScreeningStart();
              navigate("/processing");
            }}
            onBack={handleBackToHome}
          />
        }
      />


      <Route
        path="/processing"
        element={
          screeningData.image ? (
            <Processing
              image={screeningData.image}
              previewUrl={screeningData.previewUrl}
              onComplete={handleScreeningComplete}
              onBack={() => navigate("/upload")}
            />
          ) : (
            <Navigate to="/upload" replace />
          )
        }
      />


      <Route
        path="/result"
        element={
          screeningData.result ? (
            <Result
              image={screeningData.image}
              previewUrl={screeningData.previewUrl}
              result={screeningData.result}
              onNewScreening={handleReset}
              onBackHome={handleBackToHome}
            />
          ) : (
            <Navigate to="/upload" replace />
          )
        }
      />


      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

      </Routes>

      <Footer />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App; 
