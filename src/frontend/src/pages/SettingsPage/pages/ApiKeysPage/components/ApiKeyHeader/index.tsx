import ForwardedIconComponent from "../../../../../../components/genericIconComponent";
import { Button } from "../../../../../../components/ui/button";
import { API_PAGE_PARAGRAPH } from "../../../../../../constants/constants";
import SecretKeyModal from "../../../../../../modals/secretKeyModal";
import { cn } from "../../../../../../utils/utils";

type ApiKeyHeaderComponentProps = {
  selectedRows: string[];
  handleDeleteKey: () => void;
  fetchApiKeys: () => void;
  userId: string;
};
const ApiKeyHeaderComponent = ({
  selectedRows,
  handleDeleteKey,
  fetchApiKeys,
  userId,
}: ApiKeyHeaderComponentProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 space-y-0.5">
        <div className="flex w-full flex-col">
          <h2 className="flex items-center text-lg font-semibold tracking-tight">
            API Keys
            <ForwardedIconComponent
              name="Key"
              className="ml-2 h-5 w-5 text-primary"
            />
          </h2>
          <p className="text-sm text-muted-foreground">{API_PAGE_PARAGRAPH}</p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Button
            data-testid="api-key-button-store"
            variant="primary"
            className="group px-2"
            disabled={selectedRows.length === 0}
            onClick={handleDeleteKey}
          >
            <ForwardedIconComponent
              name="Trash2"
              className={cn(
                "h-5 w-5 text-destructive group-disabled:text-primary",
              )}
            />
          </Button>
          <SecretKeyModal data={userId} onCloseModal={fetchApiKeys}>
            <Button data-testid="api-key-button-store" variant="primary">
              <ForwardedIconComponent name="Plus" className="mr-2 w-4" />
              Add New
            </Button>
          </SecretKeyModal>
        </div>
      </div>
    </>
  );
};
export default ApiKeyHeaderComponent;
