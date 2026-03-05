import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '@/src/context/AuthContext';
import { ShieldCheck, Mail, Loader2 } from 'lucide-react';

const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 40px;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
`;

const Logo = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email);
      setSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <AuthCard>
        <Logo>
          <ShieldCheck size={48} />
          SiGe-App Login
        </Logo>
        
        {!sent ? (
          <form onSubmit={handleSubmit}>
            <p style={{ color: '#666', marginBottom: '24px' }}>Geben Sie Ihre E-Mail-Adresse ein, um einen Login-Link zu erhalten.</p>
            <Input 
              type="email" 
              placeholder="E-Mail-Adresse" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Mail size={20} />}
              Login-Link senden
            </Button>
          </form>
        ) : (
          <div>
            <div style={{ color: '#28a745', marginBottom: '16px' }}>
              <Mail size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3>E-Mail gesendet!</h3>
            <p style={{ color: '#666' }}>Wir haben einen Login-Link an <strong>{email}</strong> gesendet. Bitte prüfen Sie Ihren Posteingang.</p>
          </div>
        )}
      </AuthCard>
    </AuthWrapper>
  );
};
