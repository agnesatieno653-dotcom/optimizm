import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer wrap">
      <a className="footer-brand" href="#home">
        Optimistic Africa<span>.</span>
      </a>
      <p>
        A book by Dr. Anand Kulkarni.
        <br />
        <span>Supported by Africa No Filter.</span>
      </p>
      <div>
        <span className="private-label">
          <span className="dot"></span> Private prototype
        </span>
        <a className="back-top" href="#home">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};
