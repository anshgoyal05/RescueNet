# Rescue Net

**Rescue Net IP** is a web platform designed to assist in locating missing persons. The site allows users to upload images of missing individuals, which are then processed using face recognition technology to match with other images in the system. This project combines a web interface with backend support for image storage and recognition.

## Features
- Upload images of missing persons.
- Use face recognition to compare uploaded images against the database.
- Real-time identification suggestions.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (React or Vanilla JS)
- **Backend:** Node.js
- **Face Recognition:** OpenCV, TensorFlow (or chosen library)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/anshgoyal05/RescueNet
    cd rescue-net-ip
    ```

2. Install dependencies for the frontend and backend:
    ```bash
    cd frontend && npm install
    cd backend && npm install
    ```

3. Run the app:
    - Frontend: `npm start`
    - Backend: `node server.js`

4. Open the app at `http://localhost:3000`.

## Contributing
Feel free to fork the repo and submit pull requests. Contributions are welcome!
