import { getBlogPostBySlug, getAllBlogPosts } from '@/services/blog';
import { notFound } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { PrimarySection } from '@/components/commun/section/sectionType';
import Image from 'next/image';
import { Markdown } from '@/components/commun/markdown';

interface BlogPostPageParams {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const locales = ['fr', 'en'];

  return locales.flatMap(locale =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: BlogPostPageParams) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} - DevFest Nantes Blog`,
    description: `Article de blog: ${post.title}`,
    openGraph: {
      title: post.title,
      description: `Article de blog: ${post.title}`,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Section Hero avec image et titre */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        {/* Image de fond */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center center', // Centre
              filter: 'brightness(0.7)', // Assombrit l'image pour le contraste du texte
            }}
            priority
          />
        )}
        
        {/* Overlay pour améliorer la lisibilité */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
          }}
        />
        
        {/* Contenu du hero */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            px: 3,
            pb: 4,
            textAlign: 'center',
          }}
        >
          <Typography 
            variant='h1' 
            component='h1' 
            className='no-leaf'
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              mb: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {post.title}
          </Typography>
        </Box>
      </Box>

      {/* Contenu de l'article */}
      <PrimarySection>
        <Box 
          sx={{ 
            maxWidth: '800px',
            mx: 'auto',
            '& img': { 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: 1,
              my: 2,
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              // Gestion spéciale pour les images plus larges que hautes
              '&[style*="width"]': {
                maxHeight: '500px',
                width: 'auto !important',
                height: 'auto !important',
              },
            },
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              mt: 4,
              mb: 2,
              color: 'primary.main',
            },
            '& p': {
              mb: 2,
              lineHeight: 1.7,
              fontSize: '1.1rem',
            },
            '& blockquote': {
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              pl: 2,
              py: 1,
              backgroundColor: 'grey.50',
              borderRadius: 1,
              fontStyle: 'italic',
              my: 2,
            },
            '& code': {
              backgroundColor: 'grey.100',
              padding: '2px 4px',
              borderRadius: 1,
              fontSize: '0.875em',
            },
            '& pre': {
              backgroundColor: 'grey.900',
              color: 'white',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              my: 2,
              '& code': {
                backgroundColor: 'transparent',
                padding: 0,
              },
            },
            '& ul, & ol': {
              mb: 2,
              pl: 3,
            },
            '& li': {
              mb: 1,
              lineHeight: 1.6,
            },
          }}
        >
          <Markdown content={post.content} />
        </Box>
      </PrimarySection>
    </>
  );
}
