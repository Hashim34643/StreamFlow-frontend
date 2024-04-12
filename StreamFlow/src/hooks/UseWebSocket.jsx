import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url, onMessageReceived) => {
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        function connect() {
            const socket = new WebSocket(url);
            socket.onopen = () => {
                console.log("WebSocket connected");
                setIsConnected(true);
            };
            socket.onmessage = onMessageReceived;
            socket.onclose = () => {
                console.log("WebSocket disconnected");
                setIsConnected(false);
                setTimeout(connect, 3000);
            };
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            socketRef.current = socket;
        }

        connect();

        return () => {
            socketRef.current?.close();
        };
    }, [url, onMessageReceived]);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        }
    };

    return { sendMessage, isConnected };
};

export default useWebSocket;
