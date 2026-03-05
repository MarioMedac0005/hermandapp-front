import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

export default function ProcessionSettingsModal({
    isOpen,
    onClose,
    formData,
    setFormData,
    onSave,
    isSaving = false
}) {
    const isNameValid = formData?.name?.trim().length > 0;

    const handleSaveClick = () => {
        if (!isNameValid) {
            toast.error("El nombre es obligatorio");
            return;
        }
        onSave();
    };

    if (!formData) return null;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            title="Ajustes de la Procesión"
            maxWidth="max-w-lg"
        >
            <div className="space-y-5">
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nombre de la Procesión</label>
                        <input
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Descripción Histórica</label>
                        <textarea
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white resize-none"
                            value={formData.description || ""}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tipo de Paso</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl h-[46px]">
                                <button
                                    onClick={() => setFormData({ ...formData, type: 'christ' })}
                                    className={cn(
                                        "rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        formData.type === 'christ' ? "bg-white text-purple-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    Cristo
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, type: 'virgin' })}
                                    className={cn(
                                        "rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        formData.type === 'virgin' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    Palio
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, type: 'other' })}
                                    className={cn(
                                        "rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        formData.type === 'other' ? "bg-white text-slate-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    Otro
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Fecha de Salida</label>
                            <input
                                type="date"
                                className="w-full h-[46px] bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white"
                                value={formData.date || ""}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Hora Salida</label>
                            <input
                                type="time"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white"
                                value={formData.checkout_time || ""}
                                onChange={(e) => setFormData({ ...formData, checkout_time: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Hora Entrada</label>
                            <input
                                type="time"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-purple-100 focus:bg-white"
                                value={formData.checkin_time || ""}
                                onChange={(e) => setFormData({ ...formData, checkin_time: e.target.value })}
                            />
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-400 font-medium italic pl-1 leading-relaxed">
                        * Si la hora de entrada es anterior a la hora de salida, se sobreentiende que la procesión finaliza al día siguiente.
                    </p>

                    <div className="space-y-1.5 mt-2 pt-4 border-t border-slate-100">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Estado de Publicación</label>
                        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl h-[46px]">
                            <button
                                onClick={() => setFormData({ ...formData, status: 'published' })}
                                className={cn(
                                    "flex-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                    formData.status === 'published' ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                )}
                            >
                                Publicado
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, status: 'draft' })}
                                className={cn(
                                    "flex-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                    formData.status === 'draft' ? "bg-white text-slate-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                )}
                            >
                                Borrador
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-50">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-12 font-bold text-slate-600 border-slate-200"
                        onClick={onClose}
                    >
                        CANCELAR
                    </Button>
                    <Button
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-12 font-bold shadow-lg shadow-purple-100"
                        onClick={handleSaveClick}
                        disabled={isSaving}
                    >
                        {isSaving ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
