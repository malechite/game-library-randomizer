import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const useSockets = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socket.off('connect');
    };
  }, []);
};