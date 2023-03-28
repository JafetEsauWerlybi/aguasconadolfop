import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AuthProvider from './auth/AuthProvider';
import AppRouters from './routers/AppRouters';
import Layout from './Components/Layout/Layout'
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout >
          <AppRouters style={{backgroundColor:"black"}}/>
        </Layout>
        </AuthProvider>
    </Router>
  );
}

export default App;
