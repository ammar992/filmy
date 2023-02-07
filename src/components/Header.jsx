import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

function Header() {
  const useAppState = useContext(Appstate);
  return (
    <div>
      <div className="text-3xl p-3  border-b-2 border-gray-500 flex justify-between">
        <Link to={`/`}>
          <p className="text-red-500 font-bold text-size ">
            Filmy<span className="text-white">werse</span>
          </p>
        </Link>
        {useAppState.login ? (
          
          <Link to={`/add`}>
            <h1 className="text-lg cursor-pointer flex items-center">
              <Button>
                <AddIcon className="mr-2" color="error" />{' '}
                <span className="text-white">Add New</span>
              </Button>
            </h1>
          </Link>
          
        ) : (
          <Link to={`/Login`}>
            <h1 className="text-lg btn cursor-pointer flex items-center bg-green-500 px-2 rounded-sm font-bold">
              <Button>
                <span className="text-white">Login</span>
              </Button>
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
}
export default Header;
