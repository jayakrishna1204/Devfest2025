import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostWithContent } from '@/types/blog';

const blogDirectory = path.join(process.cwd(), 'data/blog');

const images: Record<string, () => Promise<typeof import ('*.jpg')>> = {
  'devfest-mini': () => import('@/images/blog/devfest-mini.jpg'),
  'devfest-hero': () => import('@/images/blog/devfest-hero.jpg'),
}

async function loadBlogImage(path: string): Promise<string | undefined> {
  const imageLoader = images[path];
  if (imageLoader) {
    const imageModule = await imageLoader();
    return imageModule.default?.src;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDirectory);

  const posts = await Promise.all(
    filenames
      .filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))
      .map(async (filename) => {
        const fullPath = path.join(blogDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const slug = filename.replace(/\.(mdx|md)$/, '');
        
        // Extraire un extrait du contenu (premiers paragraphes)
        const excerpt = extractExcerpt(content);
        
        // Gérer les images automatiquement avec await import
        const imageBase = data.image || slug;
        const miniImage = await loadBlogImage(imageBase + '-mini');
        
        return {
          title: data.title || '',
          key: data.key || slug,
          image: miniImage,
          date: data.date || '',
          slug,
          content: excerpt,
        } as BlogPost;
      })
  );

  return posts.sort((a, b) => {
    // Trier par date décroissante (plus récent en premier)
  return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function extractExcerpt(content: string): string {
  // Supprimer le frontmatter et les titres principaux
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^#.*$/gm, '')
    .trim();
  
  // Prendre les premiers paragraphes (environ 200 caractères)
  const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 0);
  let excerpt = '';
  
  for (const paragraph of paragraphs) {
    if (excerpt.length + paragraph.length < 200) {
      excerpt += paragraph + '\n\n';
    } else {
      // Couper proprement au niveau des mots
      const remainingLength = 200 - excerpt.length;
      const words = paragraph.split(' ');
      let truncated = '';
      
      for (const word of words) {
        if (truncated.length + word.length + 1 < remainingLength) {
          truncated += (truncated ? ' ' : '') + word;
        } else {
          break;
        }
      }
      
      excerpt += truncated + '...';
      break;
    }
  }
  
  return excerpt.trim() || cleanContent.substring(0, 200) + '...';
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    let fileContents: string;
    
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const markdownPath = path.join(blogDirectory, `${slug}.md`);
      if (fs.existsSync(markdownPath)) {
        fileContents = fs.readFileSync(markdownPath, 'utf8');
      } else {
        return null;
      }
    }
    
    const { data, content } = matter(fileContents);
    
    // Gérer les images automatiquement avec await import
    const imageBase = data.image || slug;
    const heroImage = await loadBlogImage(imageBase + '-hero');
    
    return {
      title: data.title || '',
      key: data.key || slug,
      image: heroImage,
      date: data.date || '',
      slug,
      content,
    } as BlogPostWithContent;
  } catch {
    return null;
  }
}
