import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck,
  HelpCircle,
  Archive,
  User
} from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: ${props => props.theme.colors.sidebar};
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 0;
    overflow: hidden;
    position: fixed;
    z-index: 1000;
    &.open {
      width: 260px;
    }
  }
`;

const SidebarHeader = styled.div`
  padding: 24px;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NavList = styled.nav`
  flex: 1;
  padding: 20px 0;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
  }

  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: transparent;
  color: #ff4d4d;
  border-radius: 8px;
  &:hover {
    background: rgba(255, 77, 77, 0.1);
  }
`;

export const Sidebar: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <SidebarContainer className={isOpen ? 'open' : ''}>
      <SidebarHeader>
        <ShieldCheck size={32} color="#007bff" />
        SiGe-App
      </SidebarHeader>
      
      <NavList>
        <NavItem to="/dashboard">
          <LayoutDashboard size={20} />
          Dashboard
        </NavItem>
        <NavItem to="/projects">
          <FileText size={20} />
          Projekte
        </NavItem>
        <NavItem to="/upload">
          <PlusCircle size={20} />
          Neues Projekt
        </NavItem>
        <NavItem to="/profile">
          <User size={20} />
          Profil & Vorlagen
        </NavItem>
        <NavItem to="/archive">
          <Archive size={20} />
          Archiv
        </NavItem>
        <NavItem to="/help">
          <HelpCircle size={20} />
          Hilfe
        </NavItem>
        
        {/* Admin Section */}
        <div style={{ marginTop: '32px', padding: '0 24px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          System
        </div>
        <NavItem to="/admin">
          <Settings size={20} />
          Admin Panel
        </NavItem>
      </NavList>

      <SidebarFooter>
        <UserProfile>
          <Avatar>{user?.name?.charAt(0) || 'U'}</Avatar>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{user?.email}</div>
          </div>
        </UserProfile>
        <LogoutButton onClick={handleLogout}>
          <LogOut size={18} />
          Abmelden
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};
