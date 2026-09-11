import Login from './Login'
import Browse from './Browse' 
import ContactUs from './ContactUs';
import InfoPage from './InfoPage';
import ProfileSelection from './ProfileSelection';
import ShowsPage from './ShowsPage';
import MoviesPage from './MoviesPage';
import GamesPage from './GamesPage';
import NewAndPopularPage from './NewAndPopularPage';
import MyListPage from './MyListPage';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/profiles",
      element: <ProfileSelection />
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/shows",
      element: <ShowsPage />
    },
    {
      path: "/movies",
      element: <MoviesPage />
    },
    {
      path: "/games",
      element: <GamesPage />
    },
    {
      path: "/new-and-popular",
      element: <NewAndPopularPage />
    },
    {
      path: "/my-list",
      element: <MyListPage />
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