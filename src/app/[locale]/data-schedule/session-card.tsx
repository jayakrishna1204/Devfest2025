'use client';

import { Box, Typography, Card, CardContent, Chip, Snackbar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Flag } from '@/components/commun/flags';
import { useState } from 'react';

interface SessionCardProps {
  session: {
    key: string;
    title: string;
    room: string;
    language: string;
    talkType: string;
    tags?: string[];
    slot: {
      start: string;
    };
  };
  speakers: Array<{ name: string }>;
}

export default function SessionCard({ 
  session, 
  speakers
}: SessionCardProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(`Copié : ${text.length > 30 ? text.substring(0, 30) + '...' : text}`);
      setTimeout(() => setCopyFeedback(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setCopyFeedback('Erreur lors de la copie');
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const formatSpeakerName = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      // Le premier mot reste en casse normale, le deuxième (nom de famille) en majuscules
      return `${words[0]} ${words.slice(1).join(' ').toUpperCase()}`;
    }
    return name;
  };

  const formatSpeakersList = (speakers: Array<{ name: string }>) => {
    return speakers.map(speaker => formatSpeakerName(speaker.name)).join('\n');
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'conference': return 'Conférence';
      case 'quickie': return 'Quickie';
      case 'codelab': return 'Codelab';
      default: return type;
    }
  };

  const getCategoryIcon = (tags: string[]) => {
    if (tags.includes('bigdata_ai')) return '🤖';
    if (tags.includes('cloud_devops')) return '☁️';
    if (tags.includes('web')) return '🌍';
    if (tags.includes('mobile')) return '📱';
    if (tags.includes('security')) return '🐱‍💻';
    if (tags.includes('discovery')) return '💡';
    if (tags.includes('iot_hardware')) return '📟';
    if (tags.includes('languages')) return '📝';
    if (tags.includes('ux_ui')) return '💚';
    return '🎯';
  };

  const getCategoryLabel = (tags: string[]) => {
    if (tags.includes('bigdata_ai')) return 'BigData & AI';
    if (tags.includes('cloud_devops')) return 'Cloud & DevOps';
    if (tags.includes('web')) return 'Web';
    if (tags.includes('mobile')) return 'Mobile';
    if (tags.includes('security')) return 'Security';
    if (tags.includes('discovery')) return 'Discovery';
    if (tags.includes('iot_hardware')) return 'IoT & Hardware';
    if (tags.includes('languages')) return 'Languages';
    if (tags.includes('ux_ui')) return 'UX / UI';
    return 'Other';
  };

  return (
    <Card 
      sx={{ 
        bgcolor: '#1a1a1a', 
        border: '1px solid #333',
        borderRadius: 2,
        '&:hover': {
          bgcolor: '#2a2a2a'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ffd700', 
                fontWeight: 'bold',
                mb: 1,
                fontSize: '1.5rem',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => copyToClipboard(session.slot.start)}
            >
              {session.slot.start}
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                mb: 1,
                lineHeight: 1.2,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => copyToClipboard(session.title)}
            >
              {session.title}
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ffd700', 
                mb: 2,
                fontWeight: 'normal',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 },
                whiteSpace: 'pre-line' // Pour permettre les retours chariot
              }}
              onClick={() => copyToClipboard(formatSpeakersList(speakers))}
            >
              {formatSpeakersList(speakers)}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip 
                icon={<span style={{ marginLeft: '8px' }}>{getCategoryIcon(session.tags || [])}</span>}
                label={getCategoryLabel(session.tags || [])}
                sx={{ 
                  bgcolor: '#333', 
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#444' },
                  '& .MuiChip-icon': {
                    color: 'white'
                  }
                }}
                onClick={() => copyToClipboard(getCategoryLabel(session.tags || []))}
              />
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white',
                mb: 1,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => copyToClipboard(getTypeLabel(session.talkType))}
            >
              {getTypeLabel(session.talkType)}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocationOnIcon sx={{ color: 'white', fontSize: '1rem' }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
                onClick={() => copyToClipboard(session.room)}
              >
                {session.room}
              </Typography>
            </Box>
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => copyToClipboard(session.language)}
            >
              <Flag lang={session.language as 'English' | 'French'} size="small" />
              <Typography variant="body2" sx={{ color: 'white' }}>
                {session.language}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      
      <Snackbar
        open={copyFeedback !== null}
        autoHideDuration={2000}
        onClose={() => setCopyFeedback(null)}
        message={copyFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4caf50',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
      />
    </Card>
  );
}
