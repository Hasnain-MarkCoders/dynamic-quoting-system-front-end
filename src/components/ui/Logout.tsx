import { useUserStore } from "@/stores/user.store.ts";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./button";

const Logout = () => {
const logout = useUserStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer top-[50px] bg-red-400 hover:bg-red-600 rounded-[10px] p-[10px] right-[50px]">
          <LogOut />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="hover:bg-gray-200">Cancel</Button>
          </DialogClose>
          <Button
            className="px-4 py-2 rounded  text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
