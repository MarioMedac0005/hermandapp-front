import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState, Fragment } from "react";
import {
  Trash2,
  Image as ImageIcon,
  Loader2,
  Plus,
  X,
  UploadCloud,
} from "lucide-react";
import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import toast from "react-hot-toast";

function Galeria({ modelType = "brotherhood", modelId }) {
  const { user, loading } = useAuth();

  const resolvedModelId =
  modelType === "band" ? user?.band_id : user?.brotherhood_id;

  const [gallery, setGallery] = useState(null);
  const [fetching, setFetching] = useState(true);

  const entityName =
  modelType === "band" ? "banda" : "hermandad";

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const getGallery = async () => {
    if (!resolvedModelId){
      setFetching(false);
      return;
    }
    try {
      setFetching(true);
      const endpoint =
        modelType === "band"
          ? API_ENDPOINTS.bands
          : API_ENDPOINTS.brotherhoods;

      const response = await fetch(`${endpoint}/${resolvedModelId}`);
      if (!response.ok) throw new Error("Error al cargar la galería");
      const data = await response.json();
      const filtered = data.data.media.filter((g) => g.category === "gallery");
      setGallery(filtered);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Error al cargar la galería");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      getGallery();
    }
  }, [resolvedModelId, loading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecciona un archivo de imagen");
        return;
      }
      setSelectedFile(file);
      // Create local preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleCreateImage = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Por favor, selecciona una imagen");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", "gallery");
      formData.append("model_type", modelType);
      formData.append("model_id", resolvedModelId);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_ENDPOINTS.media}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al subir la imagen");
      }

      toast.success("Imagen subida con éxito");
      setIsModalOpen(false);
      setSelectedFile(null);
      setPreviewUrl("");
      getGallery();
    } catch (error) {
      console.error("Error creating image:", error);
      toast.error("No se pudo subir la imagen");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id) => {
    setImageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_ENDPOINTS.media}/${imageToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al eliminar la imagen");
      }

      toast.success("Imagen eliminada correctamente");
      setIsDeleteModalOpen(false);
      setImageToDelete(null);
      getGallery();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error.message || "No se pudo eliminar la imagen");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">
          Cargando galería...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg font-medium text-muted-foreground">
          No estás logueado
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Galería de Imágenes
          </h2>
          <p className="text-muted-foreground mt-1">
            Gestiona el contenido visual de tu {entityName} de forma sencilla.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-purple-600 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-purple-700 hover:scale-[102%] active:scale-95 transition-all duration-300 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-5 h-5" />
          Crear nueva imagen
        </button>
      </header>

      {!gallery || gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-border rounded-[2.5rem] bg-muted/20">
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-full shadow-xl mb-6">
            <ImageIcon className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-foreground mb-2">
            Aún no hay imágenes
          </p>
          <p className="text-muted-foreground mb-8">
            Empieza a subir fotos para dar vida a tu {entityName}.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-foreground text-background font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-all"
          >
            Subir mi primera imagen
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((g) => (
            <article
              key={g.id}
              className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-50 dark:bg-zinc-800/50">
                <img
                  src={g.url}
                  alt={g.category || "Imagen de la galería"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400/f4f4f5/a1a1aa?text=Imagen+no+disponible";
                  }}
                />
                
                {/* Permanent Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Floating Delete Button (Always Visible) */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    className="p-3 bg-white/10 hover:bg-red-500/90 text-white backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 transition-all duration-300 hover:scale-110 hover:border-red-500/50 active:scale-95 cursor-pointer"
                    onClick={() => confirmDelete(g.id)}
                    aria-label={`Eliminar imagen`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Info Container (Always Visible) */}
                <div className="absolute bottom-0 left-0 w-full p-5 z-10">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider shadow-sm border border-white/20">
                      {g.category === 'gallery' ? 'GALERÍA' : g.category?.toUpperCase() || 'IMAGEN'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Modal: Create Image */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsModalOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
              aria-hidden="true"
            />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-8"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-8"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-[2.5rem] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-8 md:p-12 text-left align-middle shadow-2xl shadow-purple-500/10 transition-all">
                  <div className="flex justify-between items-center mb-8">
                    <div className="space-y-1">
                      <DialogTitle
                        as="h3"
                        className="text-3xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                      >
                        Añadir Imagen
                      </DialogTitle>
                      <p className="text-muted-foreground text-sm font-medium">
                        Sube una nueva foto a tu galería.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-all duration-300 group shadow-sm hover:shadow"
                    >
                      <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>

                  <form
                    onSubmit={handleCreateImage}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Left Column: Upload */}
                      <div className="space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 text-center">
                          1. Seleccionar Archivo
                        </label>
                        
                        <div
                          className="relative group cursor-pointer aspect-[4/3] rounded-[2rem] overflow-hidden"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) {
                              if (!file.type.startsWith("image/")) {
                                toast.error(
                                  "Por favor, selecciona un archivo de imagen",
                                );
                                return;
                              }
                              setSelectedFile(file);
                              const url = URL.createObjectURL(file);
                              setPreviewUrl(url);
                            }
                          }}
                        >
                          <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900/80 dark:to-zinc-800/80 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-[2rem] transition-all duration-500 group-hover:border-purple-500/60 group-hover:bg-purple-50/50 dark:group-hover:bg-purple-500/5 flex flex-col items-center justify-center gap-5">
                            
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-purple-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="relative z-10 p-5 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm text-purple-500 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-md">
                              <UploadCloud className="w-8 h-8" />
                            </div>
                            
                            <div className="relative z-10 text-center px-6 space-y-1.5">
                              <p className="text-sm font-bold text-foreground line-clamp-1 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                {selectedFile
                                  ? selectedFile.name
                                  : "Haz clic o arrastra aquí"}
                              </p>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest opacity-70">
                                PNG, JPG o WEBP
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Preview */}
                      <div className="space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 text-center">
                          Vista Previa
                        </label>
                        
                        <div className="aspect-[4/3] bg-zinc-100/50 dark:bg-zinc-900/50 rounded-[2rem] border border-border/10 overflow-hidden relative group shadow-inner">
                          {previewUrl ? (
                            <>
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider">LISTO PARA SUBIR</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400/50">
                              <ImageIcon className="w-10 h-10" />
                              <p className="text-[10px] font-black uppercase tracking-widest">
                                Sin imagen
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setSelectedFile(null);
                          setPreviewUrl("");
                        }}
                        className="w-full sm:w-1/3 py-4 text-muted-foreground font-bold hover:text-foreground transition-all duration-300 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !selectedFile}
                        className="w-full sm:w-2/3 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:grayscale transition-all duration-300 flex items-center justify-center gap-3 text-base cursor-pointer shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                        
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                            <span className="relative z-10">Subiendo...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                            <span className="relative z-10">Publicar Imagen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal: Delete Confirmation */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white dark:bg-zinc-900 p-8 text-center align-middle shadow-2xl transition-all">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-full text-red-500">
                      <Trash2 className="w-8 h-8" />
                    </div>
                    <DialogTitle as="h3" className="text-2xl font-black text-foreground">
                      ¿Borrar imagen?
                    </DialogTitle>
                    <p className="text-muted-foreground text-sm">
                      Esta acción no se puede deshacer. La imagen se eliminará permanentemente de tu galería.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="flex-1 py-4 bg-muted text-foreground font-bold rounded-2xl hover:bg-muted/80 transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleDelete}
                      className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Borrando...
                        </>
                      ) : (
                        "Sí, eliminar"
                      )}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Galeria;
