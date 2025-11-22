import { BriefcaseIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, TagIcon } from "@heroicons/react/24/outline";

function CardContent({ isEditing }) {
  return (
    <>
      <section className="p-5">
        <div className="space-y-4">
          {/* Nombre */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <TagIcon className="size-4 text-purple-600" />
                Nombre de la Hermandad
              </span>
            </label>
            <input
              type="text"
              defaultValue="Hermandad del Cristo de la Expiración"
              placeholder="Nombre de la hermandad"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Ciudad */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <MapPinIcon className="text-purple-600 size-4" />
                Ciudad
              </span>
            </label>
            <input
              type="text"
              defaultValue="Sevilla"
              placeholder="Ciudad"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Cargo */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <BriefcaseIcon className="size-4 text-purple-600" />
                Cargo
              </span>
            </label>
            <input
              type="text"
              defaultValue="Hermano Mayor"
              placeholder="Cargo"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Teléfono */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <PhoneIcon  className="size-4 text-purple-600"/>
                Teléfono
              </span>
            </label>
            <input
              type="tel"
              defaultValue="+34 954 123 456"
              placeholder="Número de teléfono"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm flex items-center gap-2 font-medium">
                <EnvelopeIcon className="size-4 text-purple-600" />
                Correo Electrónico
              </span>
            </label>
            <input
              type="email"
              defaultValue="contacto@hermandad.es"
              placeholder="correo@ejemplo.com"
              className="input input-bordered input-sm focus:input-primary w-full"
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing ? (
          <div className="flex gap-2 mt-5 pt-4 border-t border-gray-200">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Guardar Cambios
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancelar
            </button>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default CardContent;
