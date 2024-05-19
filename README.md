# ElifTech Events App

## Overview

The ElifTech Events App.

## Technologies Used

- **Frontend:**

  - HTML
  - Tailwindcss
  - Vue

- **Backend:**

  - Node.js
  - Express

- **Database:**
  - MongoDB

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Run Locally

Clone this project

### Frontend setup

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Сhange the `baseUrl` in the `useAxios.js` file to point to your server API for example:
`http://localhost:4000`

### Backend setup

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Create a file named `.env` and add the following variables, replacing the placeholder values with your own:

```env
  DB_URL=your_mongodb_connection_string
```

Start the server

```bash
  npm start
```

The backend server will start running on `http://localhost:4000`.
