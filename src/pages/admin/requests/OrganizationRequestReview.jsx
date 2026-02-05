import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateEntity } from "../../../hooks/useUpdateEntity";
import { API_ENDPOINTS } from "../../../config/api";
import {
    BuildingLibraryIcon,
    UserCircleIcon,
    MapPinIcon,
    EnvelopeIcon,
    PhoneIcon,
    MusicalNoteIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
    ChatBubbleBottomCenterTextIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";

function OrganizationRequestReview({ requestData, onSuccess }) {
    const { update, loading } = useUpdateEntity();
    const [adminNotes, setAdminNotes] = useState(requestData.admin_notes || "");

    const handleReview = async (status) => {
        const payload = {
            status,
            admin_notes: adminNotes,
        };

        const result = await update(
            `${API_ENDPOINTS.organizationRequests}/${requestData.id}`,
            payload
        );

        if (result) {
            toast.success(
                status === "approved" ? "¡Solicitud aprobada con éxito!" : "Solicitud rechazada"
            );
            onSuccess();
        }
    };

    const isPending = requestData.status === 'pending';

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${requestData.type === 'brotherhood' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {requestData.type === 'brotherhood' ? (
                            <BuildingLibraryIcon className="size-6" />
                        ) : (
                            <MusicalNoteIcon className="size-6" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                            {requestData.organization?.name}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium italic">
                            Solicitud de {requestData.type === 'brotherhood' ? 'Hermandad' : 'Banda'}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${requestData.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            requestData.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                        {requestData.status === 'pending' ? 'Pendiente' :
                            requestData.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">ID: #{requestData.id}</p>
                </div>
            </div>

            {!isPending && (
                <div className="bg-slate-800 text-white p-4 rounded-xl flex items-center justify-between shadow-lg ring-4 ring-slate-100">
                    <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-full flex items-center justify-center ${requestData.status === 'approved' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {requestData.status === 'approved' ? <CheckCircleIcon className="size-8" /> : <XCircleIcon className="size-8" />}
                        </div>
                        <div>
                            <p className="text-xs uppercase font-black tracking-widest opacity-60">Procesada por</p>
                            <p className="text-lg font-bold">{requestData.approved_by || 'Administrador'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase font-black tracking-widest opacity-60">Fecha de acción</p>
                        <p className="text-lg font-bold">{new Date(requestData.approved_at || requestData.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Organization Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b pb-2">
                        <InformationCircleIcon className="size-4 text-slate-400" />
                        Detalles de la Organización
                    </h3>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <MapPinIcon className="size-4 text-slate-400 shrink-0" />
                            <span className="text-slate-600">{requestData.organization?.city}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <EnvelopeIcon className="size-4 text-slate-400 shrink-0" />
                            <span className="text-slate-600 font-medium">{requestData.organization?.email}</span>
                        </div>

                        {requestData.type === "brotherhood" ? (
                            <>
                                <div className="flex items-start gap-3 text-sm">
                                    <BuildingLibraryIcon className="size-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-600"><span className="font-semibold">Sede:</span> {requestData.organization?.office || requestData.organization?.canonicalSeat}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <PhoneIcon className="size-4 text-slate-400 shrink-0" />
                                    <span className="text-slate-600">{requestData.organization?.phone_number || requestData.organization?.phone}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-start gap-3 text-sm">
                                    <MapPinIcon className="size-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-600"><span className="font-semibold">Ensayo:</span> {requestData.organization?.rehearsal_space || requestData.organization?.rehearsalPlace}</span>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 italic">
                                    "{requestData.organization?.description || 'Sin descripción proporcionada'}"
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* User Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b pb-2">
                        <UserCircleIcon className="size-4 text-slate-400" />
                        Responsable del Registro
                    </h3>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold uppercase">
                                {requestData.user?.name?.[0]}{requestData.user?.surname?.[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{requestData.user?.name} {requestData.user?.surname}</p>
                                <p className="text-xs text-slate-500">{requestData.user?.email}</p>
                            </div>
                        </div>
                        <div className="divider my-1"></div>
                        <p className="text-[11px] text-slate-400 italic">
                            * Este usuario recibirá un email de activación si la solicitud es aprobada.
                        </p>
                    </div>
                </div>
            </div>

            {/* Admin Notes */}
            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="size-4" />
                    Notas del Administrador
                </label>
                <textarea
                    className="textarea textarea-bordered w-full h-24 bg-white border-slate-300 focus:border-purple-500 rounded-xl"
                    placeholder="Ej: El CIF parece incorrecto, o Mensaje de bienvenida..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    disabled={!isPending}
                ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-2">
                {isPending ? (
                    <>
                        <button
                            className="btn btn-outline btn-error btn-sm h-11 px-6 rounded-xl hover:text-white transition-all shadow-sm"
                            onClick={() => handleReview("rejected")}
                            disabled={loading}
                        >
                            <XCircleIcon className="size-5 mr-1" />
                            Rechazar Solicitud
                        </button>
                        <button
                            className="btn bg-emerald-600 hover:bg-emerald-700 border-none text-white btn-sm h-11 px-6 rounded-xl transition-all shadow-md shadow-emerald-100"
                            onClick={() => handleReview("approved")}
                            disabled={loading}
                        >
                            <CheckCircleIcon className="size-5 mr-1" />
                            Aprobar y Crear Cuenta
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-2 text-slate-400 italic text-sm py-2 px-4 bg-white rounded-lg border border-slate-100">
                        <ShieldCheckIcon className="size-5 text-emerald-500" />
                        Esta solicitud ya fue finalizada por <span className="font-bold text-slate-600">{requestData.approved_by || 'Admin'}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrganizationRequestReview;
