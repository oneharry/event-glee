

export default function LoadingButton() {

  return (
      <button
        disabled={true}
        style={{ position: 'relative' }}
      >
        <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
      </button>
  );
};