import { useState } from "react";

export interface MenuProps {
  id: number;
  name: string;
  price: number;
  short_description: string;
  image: string;
}

interface MenuComponentProps {
  props: MenuProps[];
}

export function Menu({ props }: MenuComponentProps) {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.slice(startIndex, endIndex);
  const totalPages = Math.ceil(props.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 p-10 gap-6 font-farsi">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 hover:shadow-lg p-4 rounded m-2 flex-col justify-center gap-3"
          >
            <img
              className="place-self-center w-full h-[140px] object-cover"
              src={item.image}
              alt={item.name}
              width="200"
            />
            <h4 className="font-bold my-2 text-md">{item.name}</h4>
            <p className="text-gray-600 my-1 text-sm">
              {item.short_description}
            </p>
            <p className="text-amber-500 font-bold">{item.price} تومان</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 hover:shadow  text-white rounded disabled:bg-gray-300"
        >
          قبلی
        </button>
        <span className="text-lg">
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 hover:shadow text-white rounded disabled:bg-gray-300"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
