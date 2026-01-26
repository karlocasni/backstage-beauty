"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DeleteButtonProps {
    id: number;
    deleteAction: (id: number) => Promise<void>;
}

export function DeleteButton({ id, deleteAction }: DeleteButtonProps) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (window.confirm("Jeste li sigurni da želite obrisati ovu epizodu? Ova radnja je nepovratna.")) {
            await deleteAction(id);
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-500 hover:bg-red-50" type="submit">
                <Trash2 size={16} />
            </Button>
        </form>
    );
}
