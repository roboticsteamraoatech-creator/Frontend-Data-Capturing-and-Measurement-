import React from 'react';
import { useRouter } from 'next/navigation';

interface UploadImageSignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadImageSignUpModal: React.FC<UploadImageSignUpModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleGoogleSignup = () => {
    onClose();
    router.push('/auth/signup');
  };

  const handleSignupRedirect = () => {
    onClose();
    router.push('/auth/signup');
  };

  const handleLoginRedirect = () => {
    onClose();
    router.push('/auth/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
      <div
        className="bg-white rounded-[20px] shadow-lg"
        style={{
          width: "596px",
          height: "330px",
          borderRadius: "20px",
          background: "#FFFFFF",
          padding: "52px 60px 42px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "22px",
              lineHeight: "100%",
              color: "#1A1A1A",
              marginBottom: "32px"
            }}
          >
            Sign Up to Upload Images
          </div>

          <div>
            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "140%",
                color: "#6E6E6E",
                marginBottom: "12px",
              }}
            >
              Please sign up or log in to upload images and get your measurements.
            </div>
          </div>
        </div>

        <div className="flex justify-center" style={{ gap: "20px" }}>
          <button
            onClick={handleGoogleSignup}
            className="rounded-[20px] text-white flex items-center justify-center"
            style={{
              width: "180px",
              height: "38px",
              backgroundColor: '#5D2A8B',
              borderRadius: "20px",
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: "16px",
              padding: "8px 10px",
              cursor: 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21.8 10.5H12v3.5h5.6c-.3 1.5-1.2 2.8-2.4 3.6v2.4h3.9c2.3-2.1 3.8-5.2 3.8-8.9z" fill="#fff"/>
              <path d="M12 22c3.1 0 5.7-1 7.6-2.8l-3.9-3.1c-1 0.7-2.3 1.1-3.7 1.1-2.8 0-5.2-1.9-6-4.5H4.2v2.4C5.8 19.1 8.7 22 12 22z" fill="#fff"/>
              <path d="M6 12.5c0-1 .2-2 .6-2.9V7.2H4.2C3.4 8.8 3 10.6 3 12.5c0 1.9.4 3.7 1.2 5.3l2.8-2.2.1-.1z" fill="#fff"/>
              <path d="M12 6.5c1.6 0 3 0.6 4.1 1.8l3.1-3.1C17.2 3.4 14.8 2.5 12 2.5c-3.3 0-6.2 1.9-7.8 4.7l3.9 3.1c0.8-2.6 3.2-4.5 6-4.5z" fill="#fff"/>
            </svg>
            Sign Up with Google
          </button>
          <button
            onClick={handleSignupRedirect}
            className="rounded-[20px] text-white"
            style={{
              width: "120px",
              height: "38px",
              backgroundColor: '#5D2A8B',
              borderRadius: "20px",
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: "16px",
              padding: "8px 10px",
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginRedirect}
            className="rounded-[20px] text-white"
            style={{
              width: "120px",
              height: "38px",
              backgroundColor: '#5D2A8B',
              borderRadius: "20px",
              fontFamily: "Manrope",
              fontWeight: 500,
              fontSize: "16px",
              padding: "8px 10px",
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageSignUpModal;