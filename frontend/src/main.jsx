import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import CreatePost from './components/CreatePost.jsx';
import { Edit } from './components/Edit.jsx';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store from './components/redux/store.js';

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/Page" element={<Edit/>} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
