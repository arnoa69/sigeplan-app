import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { Users, CreditCard, Settings, BarChart3, ShieldAlert } from 'lucide-react';

const AdminContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid ${props => props.theme.colors.border};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.secondary};
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: 0.875rem;
`;

const Badge = styled.span<{ type: 'active' | 'trial' | 'expired' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props => {
    if (props.type === 'active') return '#d4edda';
    if (props.type === 'trial') return '#fff3cd';
    return '#f8d7da';
  }};
  color: ${props => {
    if (props.type === 'active') return '#155724';
    if (props.type === 'trial') return '#856404';
    return '#721c24';
  }};
`;

export const AdminPanel: React.FC = () => {
  return (
    <AdminContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ShieldAlert size={32} color="#dc3545" />
        <h1>System-Administration</h1>
      </div>

      <Grid>
        <Card style={{ gridColumn: 'span 2' }}>
          <CardHeader>
            <CardTitle>
              <Users size={20} />
              Benutzerverwaltung
            </CardTitle>
            <button style={{ color: '#007bff', background: 'none', fontWeight: 'bold' }}>Alle anzeigen</button>
          </CardHeader>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>E-Mail</Th>
                <Th>Status</Th>
                <Th>Projekte</Th>
                <Th>Aktion</Th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Arno Müller', email: 'arnoa69@gmail.com', status: 'active', projects: 12 },
                { name: 'Sabine Schmidt', email: 's.schmidt@arch.de', status: 'trial', projects: 2 },
                { name: 'Thomas Weber', email: 't.weber@bau.com', status: 'expired', projects: 5 },
              ].map((u, i) => (
                <tr key={i}>
                  <Td>{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td><Badge type={u.status as any}>{u.status}</Badge></Td>
                  <Td>{u.projects}</Td>
                  <Td>
                    <button style={{ color: '#666', background: 'none' }}>Edit</button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardTitle>
            <BarChart3 size={20} />
            System-Analytics
          </CardTitle>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Gesamt Dokumente</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,245</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Speicherauslastung</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.2 GB / 10 GB</div>
              <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', marginTop: '8px' }}>
                <div style={{ width: '42%', height: '100%', background: '#007bff', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>
            <CreditCard size={20} />
            Subscription & Billing
          </CardTitle>
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <strong>Monatliche Einnahmen:</strong> 2.450 €
            </div>
            <button style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', borderRadius: '8px' }}>
              Stripe Dashboard öffnen
            </button>
          </div>
        </Card>

        <Card>
          <CardTitle>
            <Settings size={20} />
            System-Templates (Master)
          </CardTitle>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Verwaltung der gesetzlichen Standard-Texte für DGUV, die in alle User-Dokumente einfließen.
          </p>
          <button style={{ width: '100%', padding: '10px', border: '1px solid #007bff', color: '#007bff', background: 'white', borderRadius: '8px' }}>
            Texte bearbeiten
          </button>
        </Card>
      </Grid>
    </AdminContainer>
  );
};
