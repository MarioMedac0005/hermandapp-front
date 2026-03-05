import { Button } from "@/components/ui/button";
import { AlertTriangle, EyeOff, Send, Save } from "lucide-react";
import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import ProcessionSettingsModal from "@/components/hermandad/ProcessionSettingsModal";

export function EditorModals({
    isConfirmModalOpen, setIsConfirmModalOpen, clearAll,
    isPublishWarningOpen, setIsPublishWarningOpen, handleSave,
    isUnpublishConfirmOpen, setIsUnpublishConfirmOpen,
    isPublishConfirmOpen, setIsPublishConfirmOpen,
    isSettingsModalOpen, handleSettingsClose,
    processionData, setProcessionData, isNameValid,
    hasLocalAutosave, handleRecoverAutosave, handleDiscardAutosave
}) {
    return (
        <>
            <Modal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="¿Limpiar todo el mapa?"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <AlertTriangle className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        Esta acción eliminará todos los tramos del recorrido y todos los puntos de interés. Esta acción se puede deshacer con Ctrl+Z, pero es drástica.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200" onClick={() => setIsConfirmModalOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 font-bold shadow-lg shadow-red-100" onClick={() => { clearAll(); setIsConfirmModalOpen(false); }}>
                            SÍ, LIMPIAR TODO
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={hasLocalAutosave}
                onClose={() => { }} // Force user to choose
                title="Cambios locales encontrados"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Save className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        Se encontraron cambios guardados automáticamente más recientes.</p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200" onClick={() => handleDiscardAutosave()}>
                            DESCARTAR
                        </Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-bold shadow-lg shadow-blue-100" onClick={() => handleRecoverAutosave()}>
                            RECUPERAR CAMBIOS
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={isPublishWarningOpen}
                onClose={() => setIsPublishWarningOpen(false)}
                title="Procesión ya publicada"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <AlertTriangle className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        Esta procesión ya se encuentra <span className="text-green-600 font-black">PUBLICADA</span>. Al guardar los cambios, estos serán visibles inmediatamente para todo el público.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200" onClick={() => setIsPublishWarningOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button className="flex-1 bg-slate-900 hover:bg-black text-white rounded-xl h-11 font-bold shadow-lg" onClick={() => handleSave()}>
                            ACEPTAR
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={isUnpublishConfirmOpen}
                onClose={() => setIsUnpublishConfirmOpen(false)}
                title="¿Convertir en Borrador?"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <EyeOff className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        Esta acción ocultará la procesión del perfil público. Solo tú podrás verla hasta que decidas volver a publicarla.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200" onClick={() => setIsUnpublishConfirmOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button className="flex-1 bg-slate-900 hover:bg-black text-white rounded-xl h-11 font-bold shadow-lg" onClick={() => { handleSave('draft'); setIsUnpublishConfirmOpen(false); }}>
                            ACEPTAR
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={isPublishConfirmOpen}
                onClose={() => setIsPublishConfirmOpen(false)}
                title="¿Publicar Procesión?"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <div className="size-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Send className="size-8" />
                    </div>
                    <p className="text-sm text-center text-slate-600 font-medium leading-relaxed">
                        ¿Estás seguro de que quieres publicar esta procesión? Será visible inmediatamente para todos los usuarios.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold text-slate-600 border-slate-200" onClick={() => setIsPublishConfirmOpen(false)}>
                            CANCELAR
                        </Button>
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 font-bold shadow-lg shadow-emerald-100" onClick={() => { handleSave('published'); setIsPublishConfirmOpen(false); }}>
                            PUBLICAR AHORA
                        </Button>
                    </div>
                </div>
            </Modal>

            <ProcessionSettingsModal
                isOpen={isSettingsModalOpen}
                onClose={handleSettingsClose}
                formData={processionData}
                setFormData={setProcessionData}
                onSave={() => {
                    handleSettingsClose();
                    handleSave();
                }}
            />
        </>
    );
}
