import { Button, Dialog as DialogMaterial, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export default function Dialog({ open, setOpen, handleConfirm, title, children, cancelText, confirmText }) {
	return (
		<DialogMaterial open={open} handler={() => setOpen(false)}>
			<DialogHeader>
				<span className="text-base">{title}</span>
			</DialogHeader>
			{children && <DialogBody divider>{children}</DialogBody>}
			<DialogFooter>
				<Button size="sm" color="gray" onClick={() => setOpen(false)} className="mr-1">
					{cancelText}
				</Button>
				<Button size="sm" className="bg-primary" onClick={() => handleConfirm()}>
					{confirmText}
				</Button>
			</DialogFooter>
		</DialogMaterial>
	);
}
