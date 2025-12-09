# shay-jones - ITDEV161 - Web Programming I 

## Final Project Enhancements

### Enhancement(s) Implemented
- Toast Notifications for user action (success, error and delete confirmation)
- Dark Mode Toggle added in the header to switch between light and dark mode with preference in localStorage

### Video Demonstration
https://matc.yuja.com/V/Video?v=14743925&node=63331691&a=5898072

### Features Added for Toast Notifications 
- Success and error notifications for post creation and editing
- Confirmation toast for deleting posts using a toast with Yes/Cancel options 
- Auto-dismiss toasts with top-right positioning (success shorter, error longer)
- Improved user feedback and overall app UX for user experience 

### Features Added for Dark Mode Toggle
- Added a toggle button in the header to switch between light and dark themes. 
- Theme preference is persisted in localStorage, so it remains across page refreshes and logins 
- Used CSS variables for colors to make switching seamless 
- Ensured sufficent contrast and readability for all elements in both themes

### Technical Implementation for Toast Notification
- Libraries/tools used: 
    - react-hot-toast, React, React Router, Context API

- Key challenges solved: 
    - Replacing default alert() and confirm() dialog 

- Main files/components modified: 
    - App.jsx - added <Toaster /> for global toast rendering 
    - Home.jsx - delete confirmation toast implementation 
    - CreatePost.jsx - success/error toasts for post creating  
    - EditPost.jsx - success/error toast for post editing 
 

### Technical Implementation for Dark Mode Toggle 
- Libraries/tools used: 
    - React Context to manage the theme state across the app (ThemeContext). 
    - localStorage to persist the user theme preference across page refreshes
    - CSS variables for defining light and dark mode, making it easier to switch 
    - useState, useEffect, useContext to toggle the theme and apply the correct class to root element

- Key challenges solved: 
    - Persisting dark mode perference across sessions 

 - Main files/components modified: 
    - App.jsx - added <ThemeProvider> for dark mode 
    - Header.jsx - added dark mode toggle button 
    - Header.css - Modify CSS file for a smoother experience 

### New Dependencies
- `package-name` - 'react-hot-toast' - for modern toast notification in React 

### Setup Instructions
1. Install dependencies: `npm install react-hot-toast` in client folder
2. Requirements: Postman and Local Host
3. Run the app: npm run dev from client folder
4. Run the app: npm run server from local folder 
