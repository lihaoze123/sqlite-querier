import { Button } from "@/app/ui/components/button";

export const DatabaseControls = ({ 
  fileInputRef, 
  onExecute, 
  onUploadDb,
  onCreateDb, 
  onExportDb 
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onExecute: () => void;
  onUploadDb: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateDb: () => void;
  onExportDb: () => void;
}) => (
  <div className="flex gap-2 justify-center">
    <Button type="button" onClick={onExecute}>执行</Button>
    <input
      type="file"
      accept=".db,.sqlite,.sqlite3"
      className="hidden"
      ref={fileInputRef}
      onChange={onUploadDb}
    />
    <Button
      type="button"
      variant="outline"
      onClick={() => fileInputRef.current?.click()}
    >
      上传数据库
    </Button>
    <Button type="button" variant="outline" onClick={onCreateDb}>
      创建数据库
    </Button>
    <Button type="button" variant="outline" onClick={onExportDb}>
      导出数据库
    </Button>
  </div>
);