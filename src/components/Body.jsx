import Login from './Login'
import Browse from './Browse' 
import ContactUs from './ContactUs';
import InfoPage from './InfoPage';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const Body = () => {
  
 

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/contact",
      element: <ContactUs />
    },
    {
      path: "/info/:slug",
      element: <InfoPage />
    }
  ]);

 


  return (
    <div>
       <RouterProvider router={appRouter} />
    </div>  
  );
};

export default Body