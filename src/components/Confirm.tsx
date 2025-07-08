import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type ConfirmDialogProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
};

const ConfirmDialog = ({
  open,
  handleClose,
  title = "Are you sure?",
  description,
  onConfirm = () => {},
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel",
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {description && <p className="text-sm text-gray-500">{description}</p>}

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="hover:bg-gray-200"
          >
            {secondaryButtonText}
          </Button>
          <Button
            className="px-4 py-2 rounded text-white"
            onClick={() => {
                try {
                onConfirm();
                handleClose()
                } catch (error) {
                    console.log(error)
                }
            
            }}
          >
            {primaryButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
