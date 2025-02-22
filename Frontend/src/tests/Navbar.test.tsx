import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/common/Navbar';



jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/'
  })
}));


jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn()
  }
}));


const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  const mockOnLogout = jest.fn();
  const mockSetIsRegistered = jest.fn();
  const mockOnSearch = jest.fn();

  const defaultProps = {
    isRegistered: false,
    onLogout: mockOnLogout,
    setIsRegistered: mockSetIsRegistered,
    onSearch: mockOnSearch
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo/title', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByText('AuraEvents')).toBeInTheDocument();
  });

  it('shows login/signup links when user is not registered', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByText('SignIn')).toBeInTheDocument();
    expect(screen.getByText('SignUp')).toBeInTheDocument();
  });

  it('shows user menu and create event button when user is registered', () => {
    renderWithRouter(<Navbar {...defaultProps} isRegistered={true} />);
    expect(screen.getByText('Create Event')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('shows EventSearch component on homepage', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
   
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  describe('User Menu Dropdown', () => {
    beforeEach(() => {
      renderWithRouter(<Navbar {...defaultProps} isRegistered={true} />);
    });

    it('opens dropdown menu when user avatar is clicked', async () => {
      const userButton = screen.getByText('User');
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Manage my events')).toBeInTheDocument();
        expect(screen.getByText('Registered Event')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();
      });
    });

    it('handles logout correctly', async () => {
      const userButton = screen.getByText('User');
      fireEvent.click(userButton);
      
      const logoutButton = await screen.findByText('Log out');
      fireEvent.click(logoutButton);

      expect(mockOnLogout).toHaveBeenCalled();
      expect(mockSetIsRegistered).toHaveBeenCalledWith(false);
      expect(toast.success).toHaveBeenCalledWith('Logged out successfully');
    });
  });

  describe('Navigation', () => {
    it('navigates to home when logo is clicked', () => {
      const navigate = jest.fn();
    
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));


      renderWithRouter(<Navbar {...defaultProps} />);
      fireEvent.click(screen.getByText('AuraEvents'));
      expect(navigate).toHaveBeenCalledWith('/');
    });

    it('navigates to create event page when create event button is clicked', () => {
      const navigate = jest.fn();
     
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));


      renderWithRouter(<Navbar {...defaultProps} isRegistered={true} />);
      fireEvent.click(screen.getByText('Create Event'));
      expect(navigate).toHaveBeenCalledWith('/create-event');
    });
  });

  describe('Search Functionality', () => {
    it('calls onSearch when search is performed', async () => {
      renderWithRouter(<Navbar {...defaultProps} />);
    
     
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test search');
      });
    });
  });
});