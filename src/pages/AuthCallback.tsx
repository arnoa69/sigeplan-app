import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

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

export const AuthCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { finishLogin } = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        if (userId && secret) {
            finishLogin(userId, secret)
                .then(() => {
                    navigate('/dashboard', { replace: true });
                })
                .catch((err) => {
                    console.error('Login failed:', err);
                    setError('Login fehlgeschlagen. Der Link ist möglicherweise ungültig oder abgelaufen.');
                });
        } else {
            setError('Ungültiger Link. Es fehlen Parameter.');
        }
    }, [searchParams, finishLogin, navigate]);

    return (
        <AuthWrapper>
            <AuthCard>
                {error ? (
                    <div>
                        <h3 style={{ color: 'red', marginBottom: '16px' }}>Fehler</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                background: '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Zurück zum Login
                        </button>
                    </div>
                ) : (
                    <div>
                        <Loader2 className="animate-spin" size={48} style={{ margin: '0 auto', color: '#0070f3', marginBottom: '16px' }} />
                        <h3>Anmeldung wird verarbeitet...</h3>
                        <p style={{ color: '#666' }}>Bitte warten Sie einen Moment.</p>
                    </div>
                )}
            </AuthCard>
        </AuthWrapper>
    );
};
