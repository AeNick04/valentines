import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ValentineApp() {
  const [stage, setStage] = useState('initial');
  const [yesButtonPosition, setYesButtonPosition] = useState({ top: '50%', left: '50%' });
  const [isRedirected, setIsRedirected] = useState(false);

  const handleYesClick = () => {
    if (stage === 'question') {
      setStage('yay');
    } else if (stage === 'sure') {
      const randomTop = Math.random() * 80 + 10 + '%';
      const randomLeft = Math.random() * 80 + 10 + '%';
      setYesButtonPosition({ top: randomTop, left: randomLeft });
    }
  };

  const handleNoClick = () => {
    if (stage === 'question') {
      setStage('sure');
    } else if (stage === 'sure') {
      if (isRedirected) {
        setStage('question');
      } else {
        setIsRedirected(true);
        setStage('question');
      }
    }
  };

  useEffect(() => {
    if (stage === 'yay') {
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: Math.random() * 360,
          spread: 55,
          startVelocity: 30,
          shapes: ['circle'],
          colors: ['#ff69b4', '#ff1493'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [stage]);

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#FFDBE9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        {stage === 'initial' && (
          <>
            <motion.h1
              style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D63384' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Hi Bunny!
            </motion.h1>
            <img src="/dudu-cute.gif" alt="Cute gif" style={{ width: '200px', height: '200px' }} />
          </>
        )}

        {stage === 'question' && (
          <>
            <motion.h1
              style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D63384' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isRedirected
                ? 'Will you be my Valentine?'
                : "I know we're not together right now but will you be my Valentine?"}
            </motion.h1>
            <img src="/bubu-rose-bubu-sweet.gif" alt="Rose gif" style={{ width: '200px', height: '200px' }} />
          </>
        )}

        {stage === 'yay' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <motion.h1
              style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D63384' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              YAYYY
            </motion.h1>
            <img src="/bubu-dudu-bubu.gif" alt="Celebration gif" style={{ width: '200px', height: '200px' }} />
            <motion.button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6C757D',
                color: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: '0.75rem',
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => setStage('initial')}
              whileHover={{ scale: 1.1, backgroundColor: '#5a6268' }}
            >
              Reset
            </motion.button>
          </div>
        )}

        {stage === 'sure' && (
          <>
            <motion.h1
              style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D63384' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Are you sureeee?
            </motion.h1>
            <img
              src="/cute-sad-bubu-dudu-panda-kick-4cn5usy9xip1m59y.gif"
              alt="Sad gif"
              style={{ width: '200px', height: '200px' }}
            />
          </>
        )}

        {stage === 'initial' && (
          <motion.button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#D63384',
              color: '#FFFFFF',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={() => setStage('question')}
            whileHover={{ backgroundColor: '#c0256f' }}
          >
            Click here
          </motion.button>
        )}

        {(stage === 'question' || stage === 'sure') && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <motion.button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#28A745',
                color: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: '0.75rem',
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                border: 'none',
                position: stage === 'sure' ? 'absolute' : 'static',
                ...yesButtonPosition,
              }}
              onClick={handleYesClick}
              whileHover={{ scale: 1.1 }}
            >
              Yes
            </motion.button>
            <motion.button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#DC3545',
                color: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: '0.75rem',
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={handleNoClick}
            >
              No
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
