import React, { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  background-color: ${props => props.theme.colors.background};
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
    padding-top: 70px;
  }
`;

const MobileHeader = styled.header`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 900;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
`;

const MenuButton = styled.button`
  background: none;
  color: ${props => props.theme.colors.dark};
`;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <LayoutWrapper>
      <MobileHeader>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>SiGe-App</div>
        <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>
      </MobileHeader>
      
      <Sidebar isOpen={isSidebarOpen} />
      
      <MainContent onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
        {children}
      </MainContent>
    </LayoutWrapper>
  );
};
