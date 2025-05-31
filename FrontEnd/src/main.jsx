import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router';
import HomePage from './pages/Homepage.jsx';
import SignIn from './pages/Signin.jsx';
import SignUp from './pages/SignUp.jsx'
import VocabPage from './pages/VocabPage.jsx'
import GamePage from './pages/GamePage.jsx';
import './index.css'
import App from './App.jsx'
import ShowResult from './components/Showresult.jsx';
import { AuthProvider } from './contexts/auth.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/vocab",
        element: <VocabPage />
      },
      // {
      //   path: "/game",
      //   element: <GamePage/>
      // },
      // {
      //   path: "/result",
      //   element: <ShowResult/>
      // }

    ]
  },
  {
    path: "/signIn",
    element: <SignIn />
  },
  {
    path: "/signUp",
    element: <SignUp />
  },
  {
    path: "/game/:examId/",
    element: <GamePage />
  },
  {
    path: "/result",
    element: <ShowResult />
  }

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);