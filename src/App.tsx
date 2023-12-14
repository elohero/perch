import {lazy, useEffect, useState} from 'react';
import { read, utils } from 'xlsx';
import { PriceContext } from '@/core/context';
import { Category, Spice } from '@/core/types';
import AppRoutes from '@/core/routes';

const LoadingLayout = lazy(
    () => import('@/core/layouts/LoadingLayout'),
);

function App() {
  const [priceList, setPriceList] = useState<Category[]>([]);

  useEffect(() => {
    (async function () {
      const sheet = await fetch(`/price.xlsx?t=${Date.now()}`);
      const arrayBuffer = await sheet.arrayBuffer();
      const workbook = read(arrayBuffer, { type: 'buffer' });
      const rawData = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

      const categories: Category[] = [];
      let lastCategoryIndex: number;

      rawData.map((object) => Object.values(object as ArrayLike<unknown>))
      .filter((row) => row.length > 0).filter((row) => row[0] !== ' ')
      .forEach((row, index, array) => {
        const isCategoryRow = typeof row[0] === 'string' && row[0].length > 1;
        if (isCategoryRow || index === array.length - 1) {
          if (lastCategoryIndex !== undefined) {
            const currentIndex = index + (index === array.length - 1 ? 1 : 0);
            const spices = array.slice(lastCategoryIndex + 1, currentIndex).map((row) => {
              const [id, name, price, description, imagePath, weight] = row;
              return { id, name, price, description, imagePath, weight } as Spice;
            });
            categories.push({
              id: `category-${ (categories.length + 1) }`,
              name: array[lastCategoryIndex][0] as string,
              spices,
            });
          }
          lastCategoryIndex = index;
        }
      });

      setPriceList(categories);
    })();
  }, []);

  if (!(priceList?.length ?? 0)) {
    return <LoadingLayout/>;
  }

  return (
    <PriceContext.Provider value={ priceList }>
      <AppRoutes/>
    </PriceContext.Provider>
  );
}

export default App;
