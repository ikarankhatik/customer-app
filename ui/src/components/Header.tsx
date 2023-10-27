import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/userSlice';

const Header = () => {
  
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  //getting isLoggedIn state from the store
  const isLoggedIn: boolean = useSelector((state:any) => state.user.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSignOut = () => {    
    dispatch(logout())
    navigate("/")
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-blue p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white text-lg font-bold">Customer App</div>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/customer')}
              className="bg-green text-white px-3 py-1 rounded"
            >
              Add Customer
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/')}
              className="bg-green text-white px-3 py-1 rounded"
            >
              Sign In
            </button>
            <button onClick={() => navigate('/sign-up')} className="bg-green text-white px-3 py-1 rounded">
              Sign Up
            </button>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-white">
          ☰
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 bg-blue w-40 p-2 space-y-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleSignOut}
                className="text-white hover:bg-blue p-2 rounded"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/customer')}
                className="text-white hover:bg-blue p-2 rounded"
              >
                Customer
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/')}
                className="text-white hover-bg-blue p-2 rounded"
              >
                Sign In
              </button>
              <button onClick={() => navigate('/sign-up')} className="text-white p-2 cursor-not-allowed">Sign Up</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
