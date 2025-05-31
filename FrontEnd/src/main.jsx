import { StrictMode } from 'react'
import ReactDom from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router';
import HomePage from './pages/Homepage.jsx';
import SignIn from './pages/Signin.jsx';
import SignUp from './pages/SignUp.jsx'
import VocabPage from './pages/VocabPage.jsx'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/vocab",
        element: <VocabPage/>
      }
    ]
  },
  {
    path: "/signIn",
    element: <SignIn/>
  },
  {
    path: "/signUp",
    element: <SignUp/>
  }
])

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
