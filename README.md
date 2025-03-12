# DailyHelper

DailyHelper is a monorepo project designed to streamline everyday work routines. It leverages AI to assist with tasks such as translations, sentence corrections, Home Assistant entity naming, and suggestions for function and value naming.

## Features

* **AI-Powered Assistance:** Utilizes AI (specifically Gemini) to provide intelligent suggestions and translations.
* **Translation and Correction:** Translates sentences and corrects grammatical errors.
* **Home Assistant Naming:** Suggests appropriate names for Home Assistant entities.
* **Naming Suggestions:** Provides naming suggestions for functions and values, improving code readability.
* **Monorepo Architecture:** Organized as a monorepo for efficient development and code sharing.
* **Frontend Application:** A user-friendly web interface built with Nuxt.
* **UI Component Library:** A reusable UI component library based on Naive UI.
* **Gemini Handler:** A dedicated package for seamless communication with the Gemini AI API.
* **Typescript:** Uses Typescript for type safety.

## Project Structure
DailyHelper/
├── frontend/        # Nuxt frontend application
├── packages/
│   ├── ui/          # Reusable UI component library (Naive UI)
│   └── gemini-handler/ # Gemini API communication handler
├── Makefile         # Build and development commands
└── README.md        # This file

## Technologies

* **Frontend:**
    * Nuxt.js
    * TypeScript
* **UI Library:**
    * Naive UI
    * TypeScript
* **Gemini Handler:**
    * TypeScript

## Environment Variables

The frontend application requires the following environment variables:

* `GEMINI_API_KEY`: Your Gemini API key (string).
* `GEMINI_API_URL`: The URL of the Gemini API.

## Makefile Commands

* `make dev`: Runs the development environment for the frontend application.
* `make lint`: Runs ESLint to check for code quality and style issues.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [repository_url]
    cd DailyHelper
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the `frontend` directory.
    * Add your `GEMINI_API_KEY` and `GEMINI_API_URL` to the `.env` file.
    ```
    GEMINI_API_KEY=your_api_key
    GEMINI_API_URL=your_api_url
    ```

4.  **Run the development environment:**

    ```bash
    make dev
    ```

5.  **Lint the code:**

    ```bash
    make lint
    ```

## License

MIT
