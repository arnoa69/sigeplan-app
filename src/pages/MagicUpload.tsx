import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileUp, Loader2, Check, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { analyzeConstructionPlan } from '@/src/lib/gemini';

const UploadContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
`;

const DropZone = styled.div<{ isDragging: boolean }>`
  border: 2px dashed ${props => props.isDragging ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.isDragging ? props.theme.colors.primary + '05' : 'white'};
  padding: 64px;
  border-radius: ${props => props.theme.radius.lg};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}05;
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.div`
  background: white;
  padding: 24px;
  border-radius: ${props => props.theme.radius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  font-size: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'success' }>`
  padding: 12px 24px;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${props => props.variant === 'success' ? props.theme.colors.success : props.theme.colors.primary};
  color: white;
`;

const PreviewBox = styled.div`
  background: #f1f3f4;
  border-radius: ${props => props.theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border: 1px solid ${props => props.theme.colors.border};
  color: #666;
  font-style: italic;
`;

export const MagicUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setIsAnalyzing(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const data = await analyzeConstructionPlan(base64, file.type);
        setExtractedData(data);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  return (
    <UploadContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 style={{ marginBottom: '32px' }}>Magic Upload Workspace</h1>
      
      {!extractedData && !isAnalyzing && (
        <DropZone 
          isDragging={isDragging}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input 
            id="fileInput" 
            type="file" 
            hidden 
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
          />
          <div style={{ background: '#007bff15', padding: '20px', borderRadius: '50%', color: '#007bff' }}>
            <FileUp size={48} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 8px 0' }}>Bauzeitenplan hochladen</h3>
            <p style={{ color: '#666', margin: 0 }}>PDF oder Bild per Drag & Drop hierher ziehen</p>
          </div>
        </DropZone>
      )}

      {isAnalyzing && (
        <div style={{ textAlign: 'center', padding: '64px' }}>
          <Loader2 size={48} className="animate-spin" style={{ color: '#007bff', margin: '0 auto 16px' }} />
          <h3>Analysiere Dokument...</h3>
          <p style={{ color: '#666' }}>Gemini KI extrahiert Projektdaten aus {fileName}</p>
        </div>
      )}

      {extractedData && (
        <AnimatePresence>
          <ReviewGrid>
            <PreviewBox>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <FileText size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <div>Vorschau von {fileName}</div>
                <div style={{ fontSize: '0.8rem', marginTop: '8px' }}>[Original-Dokument Ansicht]</div>
              </div>
            </PreviewBox>
            
            <Form>
              <h3 style={{ margin: 0 }}>Daten validieren</h3>
              <InputGroup>
                <Label>Projektname</Label>
                <Input defaultValue={extractedData.projectName} />
              </InputGroup>
              <InputGroup>
                <Label>Bauherr</Label>
                <Input defaultValue={extractedData.clientName} />
              </InputGroup>
              <InputGroup>
                <Label>Standort</Label>
                <Input defaultValue={extractedData.location} />
              </InputGroup>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <InputGroup>
                  <Label>Beginn</Label>
                  <Input type="date" defaultValue={extractedData.startDate} />
                </InputGroup>
                <InputGroup>
                  <Label>Ende</Label>
                  <Input type="date" defaultValue={extractedData.endDate} />
                </InputGroup>
              </div>
              <InputGroup>
                <Label>Gewerke (kommagetrennt)</Label>
                <Input defaultValue={extractedData.trades?.join(', ')} />
              </InputGroup>
              
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <Button variant="success" style={{ flex: 1 }}>
                  <Check size={18} />
                  Confirm & Sync
                </Button>
                <Button style={{ flex: 1 }}>
                  Generate All
                  <ArrowRight size={18} />
                </Button>
              </div>
            </Form>
          </ReviewGrid>
        </AnimatePresence>
      )}
    </UploadContainer>
  );
};
