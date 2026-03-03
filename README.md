# Chat Application

## Overview
A simple realtime chat applicaton, allows users to register, log in, and exchange messages seamlessley in a public server. Built with Express.js, Vue.js, Prisma ORM, and MySQL. 
This project is inspired by <a href="https://chat.ponkis.xyz">chat.ponkis.xyz</a> and is developed solely for learning purposes.

## Features
-  <strong>User authentication</strong>: Cookie based JWT token login and registration system.
-  <strong>Realtime messaging</strong>: Implemented websocket with socket.io library for realtime message updates.
-  <strong>Posting</strong>: User can share their thoughts on their timeline.
-  <strong>Profile Customization</strong>: User can edit their profile picture, username, and other information.

## Screenshots
### Login & Register Page
---
<small><i>last updated on 02/21/2026</i></small>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/91763370-0df4-4758-a7a6-9c26431ff8b4" />
<small><i>last updated 02/21/2026</i></small>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/45016aa2-b6da-4813-b254-b2de511817e7" />

### Chat Page
---
<small><i>last updated on 3/4/2026</i></small>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0b0b6a99-126c-4f4b-b10f-b070de07ad35" />

### Timeline Page
---
<small><i>last updated on 3/4/2026</i></small>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/31a038dd-bd32-4d72-b542-9aa6ba8973f0" />


## Installation
1. Clone the repository
   
   ```bash
     git clone https://github.com/dojimori/open-line.git
   ```
   
2. Navigate to project's directory
   
   ```bash
     cd open-line
   ```

3. Install dependencies for server and client
   -   Make sure `yarn` package manager is installed in your system.
   <br/>
   
   ```bash
     cd server && yarn
   ```
   
   ```bash
     cd client && yarn
   ```

5. Run each server
    ```bash
     open-line/server > yarn dev
   ```
   
   ```bash
     open-line/client > yarn dev
   ```
   -  Access on http://localhost:5173

## Development
-  Frontend: Vue.js
-  Backend: Express.js
-  Websocket: socket.io
-  ORM: Prisma ORM
-  Database: MySQL

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
