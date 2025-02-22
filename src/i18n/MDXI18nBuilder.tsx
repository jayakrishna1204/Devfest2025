import { CommonParams, MyComponent } from '@/types';
import { MDXPage } from '@/layout/mdxPage';

const MDXI18nPage: MyComponent<{
  pagePrefix?: string;
}> = async ({ params, ...props }) => {
  const locale = (await params).locale;
  const Component = (
    await import(`@/app/[locale]/${props.pagePrefix}/page-${locale}.mdx`)
  ).default;
  return <Component />;
};

export const MDXI18nBuilder = {
  pageWithPrefix: (pagePrefix: string) => {
    return (props: CommonParams) => (
      <MDXPage>
        <MDXI18nPage {...props} pagePrefix={pagePrefix} />
      </MDXPage>
    );
  },
  withComponents: async (
    params: CommonParams['params'],
    components: Record<'en' | 'fr' | string, React.FC>
  ): Promise<React.FC> => {
    const locale = (await params).locale;
    const Component = components[locale];
    return () => (
      <MDXPage>
        <Component />
      </MDXPage>
    );
  },
};
