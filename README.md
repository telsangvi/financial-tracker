# Financial Tracker

## Overview

📊 Financial Tracker is a web service designed to help users manage their finances effectively. It includes features for recording income and expenses, viewing financial summaries, and managing categories.

## Folder Structure

```plaintext
financial-tracker/
│
├── src/
│   ├── controllers/
│   ├── entities/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── app.ts
│
├── .husky/
│   └── pre-commit
│
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── tsconfig.json
└── ...
```

## Getting Started

To get the Financial Tracker service up and running on your local machine, follow these steps:

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the Financial Tracker repository:

   ```bash
   git clone https://github.com/telsangvi/financial-tracker.git
2. Navigate to the project directory:cd financial-tracker
3. Install dependencies:npm install

## Starting the Service
1. Run docker compose up -d : The service will be accessible at http://localhost:3000

