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

function Galeria() {
  const { user, loading } = useAuth();
  const [gallery, setGallery] = useState(null);
  const [fetching, setFetching] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const getGallery = async () => {
    if (!user?.brotherhood_id) {
      setFetching(false);
      return;
    }
    try {
      setFetching(true);
      const response = await fetch(
        `${API_ENDPOINTS.brotherhoods}/${user.brotherhood_id}`,
      );
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
    getGallery();
  }, [user]);

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
      formData.append("model_type", "brotherhood");
      formData.append("model_id", user.brotherhood_id);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_ENDPOINTS.media}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log(response);

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
            Gestiona el contenido visual de tu hermandad de forma sencilla.
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
            Empieza a subir fotos para dar vida a tu hermandad.
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
                  <span className="text-sm truncate">{g.category}</span>
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
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-[3rem] bg-white dark:bg-zinc-900 p-10 text-left align-middle shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all">
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                  >
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="block text-sm font-black uppercase tracking-widest text-muted-foreground/70">
                          Seleccionar Imagen
                        </label>
                        <div
                          className="relative group cursor-pointer"
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
                          <div className="w-full flex flex-col items-center justify-center gap-4 px-4 py-10 bg-zinc-50 dark:bg-zinc-800/50 rounded-[1.5rem] hover:bg-white dark:hover:bg-zinc-800 transition-all duration-500 group-focus-within:ring-4 group-focus-within:ring-purple-500/10 shadow-sm hover:shadow-md">
                            <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm text-purple-500 transition-transform duration-500 group-hover:scale-110">
                              <UploadCloud className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold text-foreground">
                                {selectedFile
                                  ? selectedFile.name
                                  : "Haz clic o arrastra una imagen"}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-1">
                                PNG, JPG o WEBP (Máx. 10MB)
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] leading-relaxed text-muted-foreground/60 px-2 italic">
                          Sube archivos locales directamente desde tu
                          dispositivo para un control total.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || !selectedFile}
                          className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-6 h-6 animate-spin" />
                              Subiendo...
                            </>
                          ) : (
                            <>
                              <Plus className="w-6 h-6" />
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
                          className="w-full py-5 text-muted-foreground font-bold hover:text-foreground transition-colors duration-300 text-sm cursor-pointer"
                        >
                          Cancelar y volver
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="block text-sm font-black uppercase tracking-widest text-muted-foreground/70">
                        Vista Previa del Resultado
                      </label>
                      <div className="relative">
                        {/* The Mockup Card */}
                        <div
                          className={`flex flex-col bg-card rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-1000 ${previewUrl ? "opacity-100 translate-y-0" : "opacity-40 scale-[0.98] blur-sm"}`}
                        >
                          <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            {previewUrl ? (
                              <img
                                src={previewUrl}
                                alt="Mockup"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground/20">
                                <ImageIcon className="w-12 h-12 animate-pulse" />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 shadow-sm">
                            <div className="flex flex-col min-w-0 pr-4 pl-2 font-bold">
                              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                                Categoría
                              </span>
                              <span className="text-sm truncate text-foreground">
                                Galería
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Loading/Empty State Overlay */}
                        {!previewUrl && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-[3rem] shadow-md z-10">
                            <div className="p-6 bg-white dark:bg-zinc-800 rounded-full shadow-xl mb-4 text-purple-500">
                              <ImageIcon className="w-10 h-10" />
                            </div>
                            <h4 className="text-lg font-black text-foreground">
                              Selecciona Imagen
                            </h4>
                            <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">
                              Elige un archivo a la izquierda para ver cómo
                              quedará tu carta.
                            </p>
                          </div>
                        )}
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
