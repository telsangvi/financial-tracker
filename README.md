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

# Configuring WSL for Docker on Windows

If you are using Windows Subsystem for Linux (WSL) to run Docker on your Windows machine, follow these steps for setup:

## Prerequisites

Before configuring WSL for Docker, make sure you have the following installed:

- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- Windows Subsystem for Linux (WSL)

## Steps

1. **Install Docker Desktop for Windows:**

   Download and install Docker Desktop for Windows from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. **Enable WSL 2:**

   Open Docker Desktop and go to `Settings -> General`. Check the box for "Use the WSL 2 based engine."

3. **Install WSL:**

   If you haven't already installed WSL, you can follow the [official Microsoft documentation](https://docs.microsoft.com/en-us/windows/wsl/install).

4. **Set WSL Version for Default Distribution:**

   Open PowerShell as Administrator and run the following command to set WSL version 2 for the default distribution:

   ```bash
   wsl --set-version Ubuntu-20.04 2

