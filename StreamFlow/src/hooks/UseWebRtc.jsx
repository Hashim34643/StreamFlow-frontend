import { useEffect, useRef } from 'react';

const useWebRTC = (localVideoRef, sendMessage) => {
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

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                console.log("ICE candidate:", event.candidate);
                sendMessage({
                    type: 'candidate',
                    candidate: event.candidate
                });
            }
        };

        peerConnectionRef.current = peerConnection;

        return () => {
            peerConnection.close();
        };
    }, [localVideoRef, sendMessage]);

    const startStream = (stream) => {
        stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
    };

    const createOffer = async () => {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        return offer;
    };

    const createAnswer = async (offer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        return answer;
    };

    const addCandidate = (candidate) => {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    return { startStream, createOffer, createAnswer, addCandidate };
};

export default useWebRTC;
