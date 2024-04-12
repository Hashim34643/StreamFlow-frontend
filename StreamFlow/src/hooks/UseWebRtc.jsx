import { useEffect, useRef } from 'react';

const useWebRTC = (localVideoRef) => {
    const peerConnectionRef = useRef(null);

    useEffect(() => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        peerConnection.ontrack = (event) => {
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = event.streams[0];
            }
        };

        peerConnectionRef.current = peerConnection;

        return () => {
            peerConnection.close();
        };
    }, [localVideoRef]);

    const startStream = (stream) => {
        stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
    };

    return { startStream };
};

export default useWebRTC;