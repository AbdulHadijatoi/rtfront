import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import './Breadcrumbs.css'; // Import the CSS file

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null; // Don't render breadcrumbs on the home page
  }

  // Retrieve category name from local storage
  const categoryName = localStorage.getItem('category_name');

  // Check if the current route matches dubai-activities/:id
  let updatedPathnames = [...pathnames];
  if (pathnames[0] === 'dubai-activities' && pathnames.length > 1 && categoryName) {
    updatedPathnames.splice(1, 0, categoryName); // Insert category name before the activity ID
  }

  const generateBreadcrumbName = (name) => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Box sx={{
      margin: 'auto',
      width: {
        lg: '1280px',
      },
    }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {updatedPathnames.map((value, index) => {
            const to = `/${updatedPathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === updatedPathnames.length - 1;
            return isLast ? (
              <li key={to} className="breadcrumb-item active" aria-current="page">
                {generateBreadcrumbName(value)}
              </li>
            ) : (
              <li key={to} className="breadcrumb-item">
                <Link to={to}>{generateBreadcrumbName(value)}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </Box>
  );
};

export default Breadcrumbs;
