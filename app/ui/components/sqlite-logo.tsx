import { SiSqlite } from "@icons-pack/react-simple-icons";
import { lusitana } from "@/app/ui/fonts";

export default function SQLiteLogo() {
  return (
    <div className="flex flex-row items-center gap-2 leading-none select-none">
      <SiSqlite className="w-12 h-12" color="#003B57" size={24} />
      <span className={`${lusitana.className} text-[44px] font-bold`}>
        SQLite Querier
      </span>
    </div>
  );
}