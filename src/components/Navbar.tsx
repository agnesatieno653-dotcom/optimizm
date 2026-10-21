import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.site-header')) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a className="wordmark" href="#home" aria-label="Optimistic Africa, home">
          <span className="brand-sun" aria-hidden="true">✳</span>
          <span>
            Optimistic<br />Africa<span className="brand-dot">.</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-controls="navigation"
          aria-expanded={menuOpen}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu <span aria-hidden="true">☰</span>
        </button>

        <nav id="navigation" aria-label="Main navigation" className={menuOpen ? 'open' : ''}>
          <a href="#about" onClick={closeMenu}>The book</a>
          <a href="#inside" onClick={closeMenu}>Inside the book</a>
          <a href="#author" onClick={closeMenu}>The author</a>
          <a href="#quiz" onClick={closeMenu}>Optimism quiz</a>
          <a className="button small dark" href="#get-book" onClick={closeMenu}>
            Get the book <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
