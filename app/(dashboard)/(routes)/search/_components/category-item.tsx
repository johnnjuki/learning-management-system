"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

import { cn } from "@/lib/utils";

interface CategoriesProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({ label, value, icon: Icon }: CategoriesProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: isSelected ? null : value,
        title: currentTitle,
      },
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  };


  return (
    <button
    onClick={handleClick}
      className={cn(
        "flex items-center gap-x-1 rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
