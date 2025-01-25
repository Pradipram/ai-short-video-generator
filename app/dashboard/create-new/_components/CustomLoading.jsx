import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../../../../components/ui/alert-dialog";

const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent onOpenAutoFocus = {(e) => e.preventDefault()}>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src="/loading.gif" alt="loading" height={100} width={100} />
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Generating your video...
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please do not refresh while we generate your video.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* <div className="text-center">Please don't refress this page.</div> */}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
