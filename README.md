# ChatGPT Writer Assignment

## Overview
This project is a Chrome extension that helps users generate AI-powered replies to messages on LinkedIn. The extension works directly within the LinkedIn messaging interface, providing suggested responses. **Note:** This is a demo extension, so no actual API calls are made to generate responses.

## Tech Stack
- **WTX**
- **React**
- **TypeScript**
- **Tailwind CSS**

## Features
- Follows all 7 rules as specified in the task list.
- No real API calls for generating responses (demo purposes).
- A video demonstrating the extension has been recorded.


https://github.com/user-attachments/assets/bcf2c4e1-963f-4351-a867-7d44a7285675





## Setup and Installation

To run the extension locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/MuhdHishamP/ChatGPT-Writer-assignment.git
    ```

2. Navigate to the project directory and install dependencies:
    ```bash
    cd chatgpt-writer-assignment && npm install
    ```

3. Start the local development server:
    ```bash
    npm run dev
    ```

   This will open Google Chrome with the extension running locally.

## Code Structure

- **Popup Interface**: Code related to the popup window of the extension is located in `entrypoints/popup`.
- **Content Script**: Handles interactions with the LinkedIn messaging system. Found in `entrypoints/content.ts`.



