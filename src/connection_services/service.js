// API Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000');

const apiService = {
  login: async (credentials) => {

    if (!credentials.Email || !credentials.Password) {
      alert("Please fill in all fields!");
      return;
    }

    console.log("Sending credentials:", credentials);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(JSON.stringify(errorData))
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    console.log("Response from server: ",data);
    console.log("Login Successful!");

    alert("Login Successful!")

    return data;
  },

  signup: async(credentials) => {

    if (!credentials.Email || !credentials.Password || !credentials.Name) {
      alert("Please fill in all fields!");
      return;
    }

    console.log("Sending credentials:", credentials);

    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
        credentials: "include",
        body: JSON.stringify(credentials),
    });
    console.log(response);

    if(!response.ok){
        const errorData = await response.json();
        console.log("ERROR in service.js");
        alert(JSON.stringify(errorData))
        throw new Error(errorData.error || "Signup failed");
    }

    const data = await response.json();
    console.log("Response from server:", data);
    console.log("SignUp Successful!");

    return data;
  },

  logout: async () => {
    try {
      // const response = await fetch('/logout', {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Logout failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Test API endpoint
  test: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Test API failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Test API error:', error);
      throw error;
    }
  },

  // User profile endpoints
  getUserProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user_profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },

  updateUserProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user_profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user profile error:', error);
      throw error;
    }
  },

  // Orders endpoints
  getOrders: async (status = null) => {
    try {
      const url = status ? `${API_BASE_URL}/orders?status=${status}` : `${API_BASE_URL}/orders`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Get orders error:', error);
      throw error;
    }
  },

  // Wishlist endpoints
  getWishlist: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      return await response.json();
    } catch (error) {
      console.error('Get wishlist error:', error);
      throw error;
    }
  },

  addToWishlist: async (item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }

      return await response.json();
    } catch (error) {
      console.error('Add to wishlist error:', error);
      throw error;
    }
  },

  removeFromWishlist: async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }

      return await response.json();
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      throw error;
    }
  },

};

export default apiService;
