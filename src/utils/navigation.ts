
// Utility function to navigate to employee details with specific tab
export const navigateToEmployeeDetails = (employeeId: string, tab: string = 'personnel') => {
  const url = `/entreprise/employes?employee=${employeeId}&tab=${tab}`;
  window.location.href = url;
};

// Function to get URL parameters
export const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    employeeId: urlParams.get('employee'),
    tab: urlParams.get('tab') || 'personnel'
  };
};
