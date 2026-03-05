import { Button } from "@/components/ui/button";
import { MousePointer2, Route, MapPin, Trash2, Undo2, Redo2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Tooltip({ children, tool }) {
    return (
        <div className="relative group/tooltip">
            {children}
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl z-50">
                {tool}
                <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-900"></div>
            </div>
        </div>
    );
}

export function EditorToolbar({
    activeTool, setActiveTool,
    setIsConfirmModalOpen,
    undo, redo, historyLength, redoStackLength
}) {
    return (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
            <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-2 flex flex-col gap-2 border border-slate-200/50">
                <Tooltip tool="Seleccionar">
                    <Button
                        variant={activeTool === 'select' ? "default" : "ghost"}
                        className={cn("size-10 rounded-xl", activeTool === 'select' ? "bg-purple-600 shadow-lg shadow-purple-100 text-white" : "text-slate-500 hover:bg-slate-50")}
                        onClick={() => setActiveTool('select')}
                    >
                        <MousePointer2 className="size-5" />
                    </Button>
                </Tooltip>

                <Tooltip tool="Ruta">
                    <Button
                        variant={activeTool === 'route' ? "default" : "ghost"}
                        className={cn("size-10 rounded-xl", activeTool === 'route' ? "bg-purple-600 shadow-lg shadow-purple-100 text-white" : "text-slate-500 hover:bg-slate-50")}
                        onClick={() => setActiveTool('route')}
                    >
                        <Route className="size-5" />
                    </Button>
                </Tooltip>

                <Tooltip tool="Punto">
                    <Button
                        variant={activeTool === 'marker' ? "default" : "ghost"}
                        className={cn("size-10 rounded-xl", activeTool === 'marker' ? "bg-purple-600 shadow-lg shadow-purple-100 text-white" : "text-slate-500 hover:bg-slate-50")}
                        onClick={() => setActiveTool('marker')}
                    >
                        <MapPin className="size-5" />
                    </Button>
                </Tooltip>

                <div className="h-px w-6 bg-slate-100 mx-auto my-1"></div>

                <Tooltip tool="Limpiar Mapa">
                    <Button variant="ghost" className="size-10 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500" onClick={() => setIsConfirmModalOpen(true)}>
                        <Trash2 className="size-5" />
                    </Button>
                </Tooltip>
            </div>

            <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-1 flex flex-col gap-1 border border-slate-200/50 items-center">
                <Tooltip tool="Deshacer (Ctrl+Z)">
                    <Button variant="ghost" size="icon" className="size-8 rounded-lg text-slate-400 hover:bg-slate-50 flex items-center justify-center p-0" onClick={undo} disabled={historyLength === 0}>
                        <Undo2 className="size-3.5" />
                    </Button>
                </Tooltip>

                <Tooltip tool="Rehacer (Ctrl+Y)">
                    <Button variant="ghost" size="icon" className="size-8 rounded-lg text-slate-400 hover:bg-slate-50 flex items-center justify-center p-0" onClick={redo} disabled={redoStackLength === 0}>
                        <Redo2 className="size-3.5" />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}
