import { Button } from "@/components/ui/button";
import { X, Moon, Sun, Settings2, RotateCcw, Save, EyeOff, Send, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditorTopBar({
    id, processionId, hasUnsavedChanges, mapTheme, setMapTheme,
    setIsSettingsModalOpen, handleSave, isSaving, processionData,
    setIsUnpublishConfirmOpen, setIsPublishConfirmOpen, navigate,
    lastLocalAutosaveTime, handleDiscardChanges, saveToLocalStorage
}) {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 p-4 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-6 py-2 flex justify-between items-center max-w-[1400px] mx-auto pointer-events-auto border border-slate-200/50">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-xl bg-slate-100 hover:bg-slate-200"
                        onClick={() => navigate("/hermandad/panel/procesiones")}
                    >
                        <X className="size-4" />
                    </Button>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                                {id ? "Editor" : "Nueva Procesión"}
                            </h1>
                            {hasUnsavedChanges && !lastLocalAutosaveTime && (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[9px] font-bold uppercase">
                                    Modificado
                                </span>
                            )}
                            {lastLocalAutosaveTime && (
                                <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[9px] font-bold uppercase">
                                    Guardado {lastLocalAutosaveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl h-8 px-2 xl:px-3 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                        onClick={() => setMapTheme(mapTheme === 'light' ? 'dark' : 'light')}
                    >
                        {mapTheme === 'light' ? <Moon className="size-3.5 xl:mr-1" /> : <Sun className="size-3.5 xl:mr-1" />}
                        <span className="hidden xl:inline">{mapTheme === 'light' ? "Oscuro" : "Claro"}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl h-8 px-2 xl:px-3 text-[11px] font-bold text-slate-600 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/50"
                        onClick={() => setIsSettingsModalOpen(true)}
                    >
                        <Settings2 className="size-3.5 xl:mr-1 text-slate-500" />
                        <span className="hidden xl:inline">Ajustes</span>
                    </Button>
                    {processionData.status === 'draft' ? (
                        <>
                            <Button
                                size="sm"
                                onClick={() => handleSave('draft')}
                                disabled={isSaving}
                                className={cn(
                                    "rounded-xl h-8 px-3 xl:px-4 text-[11px] font-bold shadow-md transition-all",
                                    "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 shadow-none"
                                )}
                            >
                                {isSaving ? <RotateCcw className="size-3 animate-spin xl:mr-1" /> : <Save className="size-3 xl:mr-1" />}
                                <span className="hidden xl:inline">{isSaving ? "Guardando" : "Guardar borrador"}</span>
                            </Button>
                            <Button
                                size="sm"
                                disabled={isSaving}
                                onClick={() => {
                                    handleSave('published');
                                }}
                                className={cn(
                                    "rounded-xl h-8 px-3 xl:px-4 text-[11px] font-bold shadow-lg shadow-emerald-200 transition-all",
                                    "bg-emerald-500 text-white hover:bg-emerald-600"
                                )}
                            >
                                <Send className="size-3 xl:mr-1 text-white" />
                                <span className="hidden xl:inline">Publicar</span>
                            </Button>
                        </>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => handleSave('published')}
                            disabled={isSaving || (!hasUnsavedChanges && !lastLocalAutosaveTime)}
                            className={cn(
                                "rounded-xl h-8 px-3 xl:px-4 text-[11px] font-bold shadow-lg shadow-purple-200 transition-all",
                                "bg-purple-600 hover:bg-purple-700 text-white",
                                (!hasUnsavedChanges && !lastLocalAutosaveTime) && "opacity-50 pointer-events-none"
                            )}
                        >
                            {isSaving ? <RotateCcw className="size-3 animate-spin xl:mr-1" /> : <Save className="size-3 xl:mr-1" />}
                            <span className="hidden xl:inline">{isSaving ? "Guardando" : "Guardar y publicar"}</span>
                        </Button>
                    )}
                    {id && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                saveToLocalStorage();
                                window.open(`/procesion/${processionId || id}?preview=true`, '_blank');
                            }}
                            className="rounded-xl h-8 px-3 xl:px-4 text-[11px] font-bold border-indigo-100 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 shadow-sm transition-all"
                        >
                            <Eye className="size-3 xl:mr-1 text-indigo-500" />
                            <span className="hidden xl:inline">Vista Previa</span>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}
