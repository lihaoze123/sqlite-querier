import { Alert, AlertTitle, AlertDescription } from "@/app/ui/components/alert";
import { Terminal } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function UpdateSuccess({ showSuccess }: { showSuccess: boolean }) {
  return <Alert className={cn({ block: showSuccess, hidden: !showSuccess })}>
    <Terminal className="h-6 w-4" />
    <AlertTitle>
      Success
    </AlertTitle>
    <AlertDescription>
      <strong>数据库上传成功！</strong>
    </AlertDescription>
  </Alert>;
}