import React, { useEffect, useRef, useState } from "react";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    // WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    setWs(socket);

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "drawing") {
        const { x, y } = data;
        drawFromServer(x, y);
      } else if (data.type === "userList") {
        setActiveUsers(data.users);
      }
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    sendDrawingData(offsetX, offsetY); // Send drawing data to WebSocket
  };

  const sendDrawingData = (x, y) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const data = {
        type: "drawing",
        x,
        y,
      };
      ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open");
    }
  };

  const drawFromServer = (x, y) => {
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ border: "2px solid black" }}
      />
      <div>
        <h3>Active Users:</h3>
        <ul>
          {activeUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Whiteboard;
