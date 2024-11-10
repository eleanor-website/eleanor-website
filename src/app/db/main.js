const axios = require('axios');
// const api = 'http://localhost:5000';
// const api = 'https://eleanor-website-back-end.vercel.app';
const api = process.env.NEXT_PUBLIC_API_KEY; //back end api

export const getUserData = async (id) => {
    try {
      const response = await axios.get(`${api}/Getuser`, {
        params: {
            id: id,
          },
      });
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: 'An error occurred. Please try again.' };
      }
    }
  };
export const loginUser = async (name, pass) => {
    try {
        const response = await axios.post(`${api}/login`, { name, pass });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.data.message) {
            return { success: false, message: error.response.data.message }; // Return error message from server
        } else {
            return { success: false, message: 'An error occurred. Please try again.' }; // Generic error message
        }
    }
};
export const handleCreate = async (username, password, name, email) => {
    try {
        const response = await axios.post(`${api}/CreateUser`, {
            username: username,
            password: password,
            name: name,
            email: email,
        });

        // If the request is successful, return the response data
        return { success: true, data: response.data };
    } catch (err) {
        if (err.response && err.response.data) {
            // Handle server error
            return { success: false, message: err.response.data.message };
        } else {
            // Handle general error
            return { success: false, message: 'Error registering. Please try again.' };
        }
    }
};
// Function to request forgotten password
export const getForgetPass = async (name) => {
    try {
        const response = await axios.post(`${api}/getPass`, { name }); // Make a request to get the password
        if (response.data.success) {
            return { success: true, password: response.data.password }; // Return success with password
        } else {
            return { success: false, message: response.data.message }; // Return failure with message
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message }; // Return failure with message
        } else {
            return { success: false, message: 'An error occurred. Please try again.' }; // Return general error message
        }
    }
};
export const addCategory = async (id, catName,selectedOption) => {
    try {
        const response = await axios.post(`${api}/addCategory`, { id, catName ,selectedOption});
        
        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || 'Failed to add category' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Internal error' };
    }
};
// Function to get cat user
export const getCategories = async (id) => {
    try {
        const response = await axios.post(`${api}/getCat`, {
            id // Send user ID in request
        });

        if (response.data.success) {
            return { success: true, cat: response.data.categories }; // Return success with categories
        } else {
            return { success: false, message: response.data.message }; // Return failure with message
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message }; // Return failure with server message
        } else {
            return { success: false, message: 'An error occurred. Please try again.' }; // General error message
        }
    }
};
// Function to get item by cat key
export const getItemByCat = async (id, CatRef) => {
    try {
        const response = await axios.post(`${api}/getItems`, {
            id,
            CatRef, // Ensure this matches the key you are sending to the backend
        });

        if (response.data.success) {
            return { success: true, items: response.data.items }; // Return success with items
        } else {
            return { success: false, message: response.data.message }; // Return failure with message
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message }; // Return failure with message
        } else {
            return { success: false, message: 'An error occurred. Please try again.' }; // Return general error message
        }
    }
};
export const deleteItem = async (id,itemIndex, catIndex) => {
    try {
        const response = await axios.post(`${api}/deleteItem`, {id, itemIndex, catIndex});

        if (response.data.success) {
            return { success: true, data: response.data.message };
        } else {
            return { success: false, message: response.data.message || 'Failed to delete item' };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};
export const addToUsed = async (id, item, mode) => {
    try {
        const response = await axios.post(`${api}/AddUsedItem`, { id, item, mode });

        if (response.data.success) {
            return { success: true, data: response.data.message };
        } else {
            return { success: false, message: response.data.message || 'Failed to add item' };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};
export const getUsedItems = async (id) => {
    try {
        const response = await axios.post(`${api}/GetUsedItem`, { id });

        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || 'Failed to fetch items' }; // Changed message for clarity
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};
export const ReUsedItems = async (id, item,index) => {
    try {
        const response = await axios.post(`${api}/ReUsedItem`, { id, item,index});

        if (response.data.success) {
            return { success: true, data: response.data.message };
        } else {
            return { success: false, message: response.data.message || 'Failed to delete item' };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};

export const fetchAllItems = async (id) => {
    try {
        const response = await axios.post(`${api}/GetAllItem`, { id });

        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || 'Failed to fetch items' }; // Changed message for clarity
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};

export const GetNotification = async (id) => {
    try {
        const response = await axios.post(`${api}/GetNotification`, { id });

        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || 'Failed to fetch items' }; // Changed message for clarity
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};

export const deleteItemNotiction = async (id,catName, item) => {
    try {
        const response = await axios.post(`${api}/deleteItemFromNot`, {id, catName, item});

        if (response.data.success) {
            return { success: true, data: response.data.message };
        } else {
            return { success: false, message: response.data.message || 'Failed to delete item' };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};
export const reusedNotItem = async (id, catName,item) => {
    try {
        const response = await axios.post(`${api}/ReUsedItemInNot`, { id, catName,item});
        
        if (response.data.success) {
            return { success: true, data: response.data.message };
        } else {
            return { success: false, message: response.data.message || 'Failed to reuse item' };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const DeleteCategory = async (id, catName) => {
    try {
        const response = await axios.post(`${api}/DeleteCat`, { id, catName});
        
        if (response.data.success) {
            return { success: true, data: response.data.message };
        } else {
            return { success: false, message: response.data.message || 'Failed to delete category' };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'Internal error' };
    }
};