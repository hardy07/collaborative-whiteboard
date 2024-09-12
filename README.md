# Real-Time Collaborative Whiteboard

A real-time collaborative whiteboard application built with React, HTML5 Canvas, and WebSocket. This project allows multiple users to draw on a shared canvas, synchronize their drawings in real-time, and see active users.

## Features

- Real-time drawing synchronization using WebSocket.
- Collaborative whiteboard functionality using HTML5 Canvas.
- List of active users connected to the whiteboard.
- Responsive UI with drawing tools.
- Scalable WebSocket backend for handling multiple users.

In the project directory, you can run:

## Technologies Used

Frontend: React.js, HTML5 Canvas (used to draw graphics)
Backend: Node.js, WebSocket (ws library)

## Installation

Follow these steps to install and run the project:

1.  Clone this repository to your local machine:

```bash
git clone https://github.com/hardy07/collaborative-whiteboard.git
cd collaborative-whiteboard
```

2. Install Dependencies: Install the required npm packages for both frontend and backend

```bash
npm install

cd server
npm install
```

3. Run WebSocket Server

```bash
node server.js
```

4. Run the React Application

```bash
npm start
```

The application will be available at `http://localhost:3000` in your browser.

## Usage

- Open the application in your browser (http://localhost:3000).
- You will be able to draw on the canvas using your mouse.
- Any other user connected to the same WebSocket server will see your drawing in real-time.
- The list of active users will be displayed in the UI.

## Project Files

- Whiteboard.jsx: Contains the logic for drawing on the canvas and synchronizing the drawings via WebSocket.
- server.js: WebSocket server that handles real-time communication between multiple users.

# Questions

## 1. How would you set up a real-time WebSocket connection in a React component for collaborative editing?

To establish a real-time WebSocket connection in a React component, you can follow these steps:

- **WebSocket Initialization**: Inside the React component, use the `useEffect` hook to establish a WebSocket connection when the component mounts. This ensures that the connection is set up when the component is loaded.

- **WebSocket Events**: Handle WebSocket events like `onopen` (when the connection is established), `onmessage` (for receiving messages from the server), and `onclose` (for closing the connection).

- **Cleanup**: Ensure to close the WebSocket connection when the component unmounts to avoid memory leaks.

## 2. Describe how to implement drawing functionality on an HTML5 canvas using React.

To implement drawing functionality on an HTML5 canvas in React:

- **Canvas Setup**: Use the `useRef` hook to get a reference to the HTML5 `<canvas>` element. This allows direct access to the canvas API for drawing.

- **Drawing Methods**: Set up functions to handle mouse events like `onMouseDown`, `onMouseMove`, and `onMouseUp`. These events allow the user to draw on the canvas.

- **Context Setup**: Initialize the 2d context from the canvas for drawing operations (like `beginPath()`, `lineTo()`, and `stroke()`).

## 3. How can you synchronize the state of the canvas across multiple users in real-time?

To synchronize the canvas state across multiple users in real-time:

- **Send Drawing Data**: Whenever the user draws on the canvas, send the drawing data (e.g., coordinates) to the WebSocket server. The server can broadcast this data to all connected clients.

- **Receive Drawing Data**: On the client side, receive updates from the WebSocket and update the canvas accordingly by drawing the received data.

- **Ensure Coordination**: By using WebSocket messages, you can synchronize all users’ drawing actions in real-time, ensuring that everyone sees the same state of the canvas.

## 4. Explain how you would handle and display the list of active users.

To handle and display the list of active users:

- **Track Active Users**: Maintain a list of active users on the server, and broadcast this list to all clients when users connect or disconnect.

- **Update User List**: When the client receives the updated user list via WebSocket, update the local state in React to re-render the list of active users.

- **Display Users**: Use the `map()` function in React to dynamically render the list of users in a UI component (e.g., a sidebar or a header).

## 5. What measures would you take to ensure the scalability and performance of the real-time collaborative whiteboard?

To ensure scalability and performance:

- **Efficient WebSocket Management**: Use WebSocket servers that can scale horizontally, such as those built on Node.js with libraries like ws or socket.io. Load balancing can be added with tools like Nginx or HAProxy.

- **Rate Limiting**: Implement rate limiting for drawing events to avoid flooding the WebSocket server with too many messages. For example, throttle the number of messages per second.

- **Data Compression**: Compress WebSocket messages to reduce bandwidth usage, especially when broadcasting large amounts of data to multiple users.

- **State Management**: Keep the canvas state minimal and send only necessary updates to reduce the amount of data being transmitted over WebSockets.

- **Server-Side Scaling**: Utilize cloud-based services (e.g., AWS, Google Cloud) to automatically scale WebSocket servers as more users connect.

- **Canvas Optimization**: Ensure the canvas rendering is efficient by optimizing the drawing operations (e.g., using requestAnimationFrame for smoother rendering).
