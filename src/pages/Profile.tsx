import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { User, Building2, Mail, Save, FileUp } from 'lucide-react';

const ProfileContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.colors.primary};
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
`;

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 12px 24px;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const TemplateUpload = styled.div`
  border: 2px dashed ${props => props.theme.colors.border};
  padding: 32px;
  border-radius: ${props => props.theme.radius.md};
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

export const Profile: React.FC = () => {
  return (
    <ProfileContainer
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Title>Profil & Einstellungen</Title>

      <Card>
        <SectionTitle>
          <User size={20} />
          Persönliche Informationen
        </SectionTitle>
        <FormGroup>
          <InputGroup>
            <Label>Vollständiger Name</Label>
            <Input placeholder="z.B. Arno Müller" />
          </InputGroup>
          <InputGroup>
            <Label>Unternehmen</Label>
            <Input placeholder="z.B. Müller Architektur" />
          </InputGroup>
        </FormGroup>
        <Button>
          <Save size={18} />
          Profil speichern
        </Button>
      </Card>

      <Card>
        <SectionTitle>
          <Mail size={20} />
          SMTP-Einstellungen (E-Mail Versand)
        </SectionTitle>
        <FormGroup>
          <InputGroup>
            <Label>SMTP Host</Label>
            <Input placeholder="smtp.example.com" />
          </InputGroup>
          <InputGroup>
            <Label>Port</Label>
            <Input placeholder="587" />
          </InputGroup>
          <InputGroup>
            <Label>Benutzername</Label>
            <Input placeholder="user@example.com" />
          </InputGroup>
          <InputGroup>
            <Label>Passwort</Label>
            <Input type="password" placeholder="••••••••" />
          </InputGroup>
        </FormGroup>
        <Button>
          <Save size={18} />
          SMTP testen & speichern
        </Button>
      </Card>

      <Card>
        <SectionTitle>
          <FileUp size={20} />
          Master-Templates
        </SectionTitle>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Laden Sie Ihre Word- oder PDF-Vorlagen hoch. Das System erkennt automatisch Platzhalter für Kopf- und Fußzeilen.
        </p>
        <TemplateUpload>
          <FileUp size={32} style={{ marginBottom: '12px' }} />
          <div>Klicken oder Datei hierher ziehen</div>
          <div style={{ fontSize: '0.75rem', marginTop: '8px' }}>Unterstützte Formate: .docx, .pdf</div>
        </TemplateUpload>
      </Card>
    </ProfileContainer>
  );
};
