import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Users,
  Briefcase
} from 'lucide-react';

const DashboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${props => props.color}15;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.secondary};
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CardTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.div`
  font-weight: bold;
`;

const ProjectMeta = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.secondary};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#e6f4ea';
      case 'draft': return '#fef7e0';
      case 'completed': return '#e8f0fe';
      default: return '#f1f3f4';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#1e8e3e';
      case 'draft': return '#f9ab00';
      case 'completed': return '#1967d2';
      default: return '#5f6368';
    }
  }};
`;

const RoadmapItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  opacity: 0.6;

  &:last-child {
    border-bottom: none;
  }
`;

export const Dashboard: React.FC = () => {
  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Willkommen zurück, Arno</Title>
        <div style={{ color: '#666' }}>Donnerstag, 5. März 2026</div>
      </Header>

      <StatsGrid>
        <StatCard>
          <IconWrapper color="#007bff">
            <Briefcase size={28} />
          </IconWrapper>
          <StatInfo>
            <StatValue>12</StatValue>
            <StatLabel>Aktive Projekte</StatLabel>
          </StatInfo>
        </StatCard>
        <StatCard>
          <IconWrapper color="#28a745">
            <CheckCircle2 size={28} />
          </IconWrapper>
          <StatInfo>
            <StatValue>45</StatValue>
            <StatLabel>Dokumente generiert</StatLabel>
          </StatInfo>
        </StatCard>
        <StatCard>
          <IconWrapper color="#ffc107">
            <Clock size={28} />
          </IconWrapper>
          <StatInfo>
            <StatValue>3</StatValue>
            <StatLabel>Anstehende Deadlines</StatLabel>
          </StatInfo>
        </StatCard>
        <StatCard>
          <IconWrapper color="#17a2b8">
            <TrendingUp size={28} />
          </IconWrapper>
          <StatInfo>
            <StatValue>85%</StatValue>
            <StatLabel>Effizienz-Steigerung</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <SectionGrid>
        <Card>
          <CardTitle>
            <FileText size={20} />
            Aktuelle Projekte
          </CardTitle>
          <ProjectList>
            {[
              { name: 'Neubau Wohnanlage "Grüne Oase"', client: 'Bau GmbH', status: 'active', date: '12.03.2026' },
              { name: 'Sanierung Altstadt-Palais', client: 'Stadtverwaltung', status: 'draft', date: '20.03.2026' },
              { name: 'Gewerbepark Nord - Halle 4', client: 'Logistics AG', status: 'active', date: '05.04.2026' },
              { name: 'Erweiterung Grundschule West', client: 'Gemeinde', status: 'completed', date: '01.02.2026' },
            ].map((p, i) => (
              <ProjectItem key={i}>
                <ProjectInfo>
                  <ProjectName>{p.name}</ProjectName>
                  <ProjectMeta>{p.client} • Start: {p.date}</ProjectMeta>
                </ProjectInfo>
                <StatusBadge status={p.status}>
                  {p.status === 'active' ? 'Aktiv' : p.status === 'draft' ? 'Entwurf' : 'Abgeschlossen'}
                </StatusBadge>
              </ProjectItem>
            ))}
          </ProjectList>
        </Card>

        <Card>
          <CardTitle>
            <AlertCircle size={20} />
            Roadmap (Coming Soon)
          </CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <RoadmapItem>
              <div style={{ fontWeight: 'bold' }}>Routenplaner</div>
              <div style={{ fontSize: '0.8rem' }}>Google Maps Integration für Baustellenbesuche.</div>
            </RoadmapItem>
            <RoadmapItem>
              <div style={{ fontWeight: 'bold' }}>Asbest/TRGS 519</div>
              <div style={{ fontSize: '0.8rem' }}>Spezial-Arbeitspläne für Abbruchphasen.</div>
            </RoadmapItem>
            <RoadmapItem>
              <div style={{ fontWeight: 'bold' }}>Finance Export</div>
              <div style={{ fontSize: '0.8rem' }}>Direkter Export an Buchhaltungssoftware.</div>
            </RoadmapItem>
          </div>
        </Card>
      </SectionGrid>
    </DashboardContainer>
  );
};
