'use client';
import { categories } from '@/app/data/categoriesData';
import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from '../CategoryBox';
import Container from '../Container';

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get('category');
  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-2 flex items-center justify-between overflow-x-auto">
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
