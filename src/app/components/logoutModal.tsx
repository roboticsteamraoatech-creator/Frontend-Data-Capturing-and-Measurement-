'use client';

import React from 'react';
import { X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 9998,
        }}
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="fixed"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '596px',
          height: '266px',
          background: '#FFFFFF',
          borderRadius: '20px',
          zIndex: 9999,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '42px 60px 0 60px',
            borderBottom: 'none',
          }}
        >
          <h2
            style={{
              fontFamily: 'Manrope',
              fontWeight: 600,
              fontSize: '22px',
              color: '#1A1A1A',
              margin: 0,
            }}
          >
            Logout
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: '#FBFAFC',
              border: 'none',
              width: '50px',
              height: '50px',
              borderRadius: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
            type="button"
          >
            <X className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '0 60px 60px 60px',
          }}
        >
          <p
            style={{
              fontFamily: 'Manrope',
              fontWeight: 300,
              fontSize: '18px',
              color: '#6E6E6E',
              margin: '24px 0 0 0',
              lineHeight: '100%',
            }}
          >
            Are you sure you want to logout?
          </p>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={onCancel}
              style={{
                width: '73px',
                height: '38px',
                borderRadius: '20px',
                border: '1px solid #E4D8F3',
                background: '#FFFFFF',
                fontFamily: 'Manrope',
                fontWeight: 500,
                fontSize: '16px',
                color: '#6E6E6E',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F4EFFA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                width: '81px',
                height: '38px',
                borderRadius: '20px',
                background: '#5D2A8B',
                border: 'none',
                fontFamily: 'Manrope',
                fontWeight: 500,
                fontSize: '16px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4A1F70';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#5D2A8B';
              }}
              type="button"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};