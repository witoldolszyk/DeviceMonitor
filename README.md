# Equipment Monitoring Dashboard

A front-end application built with Angular 18, simulating an industrial equipment management system. The dashboard allows users to log in, view equipment status, and filter by different states such as Active, Inactive, and Error.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [License](#license)

## Features

- **User Authentication**: Secure login validation using mock data.
- **Equipment Monitoring**: Displays equipment list with real-time status updates.
- **Status Filtering**: Filters equipment by various statuses (Active, Inactive, Error).
- **Reactive Updates**: Implements Angular’s reactive features, including signals and combineLatest with RxJS for handling dynamic data and status changes.
- **Error Handling**: Displays user-friendly error messages for a smooth user experience.

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/witoldolszyk/DeviceMonitor.git

cd DeviceMonitor-main

###  2. Install Dependencies

Make sure you have Node.js and npm installed, then run:

npm install

###  3. Run the Application

Start the development server with:

ng serve
In your browser, go to http://localhost:4200 to access the app.

###  4. Navigate to the Application

Open your browser and go to http://localhost:4200.

Credentials to log in:

username: 'user1', password: 'password1'

username: 'user2', password: 'password2'

username: 'admin', password: 'admin123' 

## Testing

Run unit tests with:

ng test

## Design Decisions

### Angular 18:

 Chosen for its standalone components, signals, and enhanced reactive programming features, supporting efficient change detection and clear separation of concerns.

### RxJS: 

Used for managing real-time data streams and reactive programming, allowing dynamic responses to data and filter changes.

### Tailwind CSS: 

Implemented for rapid styling with utility classes, providing a consistent and responsive UI.

## Architectural Choices

### Standalone Component Design:

The application uses Angular’s standalone components, enhancing modularity and flexibility. This approach enables components to function independently of Angular modules, making it easier to scale into a modular structure if needed.

### Reactive State Management: 

Utilizes signals and RxJS observables for efficient state management, ensuring the UI dynamically responds to state changes.

### Error Handling: 

Integrated error handling in services to provide user-friendly messages regarding connectivity or data issues.
