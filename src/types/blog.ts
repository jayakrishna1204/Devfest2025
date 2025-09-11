export interface BlogPost {
  title: string;
  key: string;
  image: string;
  date: string;
  slug: string;
  content: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}
