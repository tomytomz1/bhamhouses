import { getPageConfig } from '@/config/pageSections';
import PageRenderer from '@/components/PageRenderer';

export default function HomePage() {
  const config = getPageConfig('homepage');
  
  if (!config) {
    return <div>Page configuration not found</div>;
  }

  return <PageRenderer config={config} />;
}
