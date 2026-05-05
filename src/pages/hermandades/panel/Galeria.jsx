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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {gallery.map((g) => (
            <article
              key={g.id}
              className="group flex flex-col bg-card rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={g.url}
                  alt={g.category || "Imagen de la galería"}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border-t border-border/10">
                <div className="flex flex-col min-w-0 pr-4 pl-2 font-medium">
                  <span className="text-xs text-muted-foreground">
                    Categoría
                  </span>
                  <span className="text-sm truncate">{g.category === 'gallery' ? 'Galería' : g.category}</span>
                </div>
                <button
                  className="shrink-0 p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-90 shadow-xs cursor-pointer"
                  onClick={() => confirmDelete(g.id)}
                  aria-label={`Eliminar imagen`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-4"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-[3.5rem] bg-white dark:bg-zinc-900 p-12 text-left align-middle shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <DialogTitle
                        as="h3"
                        className="text-3xl font-black tracking-tight text-foreground"
                      >
                        Añadir Imagen
                      </DialogTitle>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Completa los detalles para tu nueva publicación.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-3 hover:bg-muted rounded-2xl transition-all duration-300 group"
                    >
                      <X className="w-6 h-6 text-muted-foreground group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>

                  <form
                    onSubmit={handleCreateImage}
                    className="space-y-12"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left Column: Upload */}
                      <div className="space-y-6">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50 text-center">
                          1. Seleccionar Imagen
                        </label>
                        
                        <div
                          className="relative group cursor-pointer aspect-video"
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
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-700 group-hover:border-purple-500/50 group-hover:bg-white dark:group-hover:bg-zinc-800 transition-all duration-500 shadow-xs hover:shadow-xl hover:-translate-y-1">
                            <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm text-purple-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                              <UploadCloud className="w-8 h-8" />
                            </div>
                            <div className="text-center px-6">
                              <p className="text-sm font-bold text-foreground line-clamp-1">
                                {selectedFile
                                  ? selectedFile.name
                                  : "Haz clic o arrastra aquí"}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                                PNG, JPG o WEBP (Máx. 10MB)
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] leading-relaxed text-muted-foreground/50 text-center italic px-4">
                          Sube archivos locales directamente desde tu dispositivo.
                        </p>
                      </div>

                      {/* Right Column: Preview */}
                      <div className="space-y-6">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50 text-center">
                          Vista Previa
                        </label>
                        
                        <div className="aspect-video bg-zinc-50 dark:bg-zinc-800/40 rounded-[2rem] border border-border/10 overflow-hidden">
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Mockup"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground/20">
                              <ImageIcon className="w-12 h-12" />
                              <p className="text-[10px] font-black uppercase tracking-widest">
                                Sin imagen
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Centered Actions */}
                    <div className="flex flex-col items-center justify-center gap-6 pt-4">
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
                        <button
                          type="submit"
                          disabled={isSubmitting || !selectedFile}
                          className="flex-[2] w-full px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg cursor-pointer shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-1 active:scale-95"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              Subiendo...
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-6 h-6" />
                              Publicar Imagen
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsModalOpen(false);
                            setSelectedFile(null);
                            setPreviewUrl("");
                          }}
                          className="flex-1 w-full py-4 text-muted-foreground font-bold hover:text-foreground transition-all duration-300 text-sm cursor-pointer hover:bg-muted/50 rounded-2xl"
                        >
                          Cancelar
                        </button>
                      </div>
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
