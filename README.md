# GraphQL

## Authors
- Hamza Maach

## Project Description
This project involves creating a personalized profile page using GraphQL. The goal is to query user-specific data from a GraphQL endpoint and present it in a visually appealing and interactive interface. The profile page will include sections for basic user information, achievements, and statistics. Additionally, the page will feature two SVG-based graphs to display data insights. A secure login system with JWT-based authentication is implemented to access user data.

## Features
### User Authentication
- Login functionality with email/username and password
- JWT-based authentication to access the GraphQL API
- Error handling for invalid credentials
- Logout functionality

### Profile Page
- Displays personalized user data retrieved via GraphQL queries
- Includes the following sections:
  - Basic user information 
  - Audit Statistics
  - Level Achievement
- Graphs showcase various metrics such as:
  - Skills overview
  - XP earned over time

### Hosting
- The profile page is hosted online for easy access using Netlify, you can find it here : 

## Project Structure
```
graphql/
├── images/
├── scripts/
│   ├── api/              # GraphQL query implementations
│   ├── app/              # Core application logic
│   ├── components/       # UI components
│           ├── graphs/   # Graph generation components
│           └── profile/  # Profile-specific components
│   ├── authComponent.js  # Login/logout functionality
│   └── profileComponent.js # Profile data handling
├── styles/               # CSS styles
├── index.html            # Single page application entry point
└── README.md             # Project documentation
```

## Technologies
### Frontend
- HTML5 & CSS3
- Font Awesome icons
- Vanilla JavaScript (No frameworks)
- Single Page Application architecture
- GraphQL queries for data retrieval
- SVG for interactive and animated graphs
