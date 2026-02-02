"use client";

import React from 'react';

const GlobalScrollbar = () => {
    return (
        <style jsx global>{`
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #01040D; }
      ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #FF00FF; }
      html { scroll-behavior: smooth; }
      .perspective-1000 { perspective: 1000px; }
    `}</style>
    );
};

export default GlobalScrollbar;
