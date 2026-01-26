export default function TerminosUso() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 tracking-tight">Términos de Uso</h1>
                <div className="h-1.5 w-32 bg-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-purple-100">
                <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
                    <section className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-purple-900 flex items-center gap-2">
                            1. Aceptación de los Términos
                        </h2>
                        <p className="text-gray-800">
                            Al acceder y utilizar HermandApp, usted acepta estar sujeto a estos Términos de Uso y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">2. Licencia de Uso</h2>
                        <p className="mb-4">
                            Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de HermandApp solo para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:
                        </p>
                        <ul className="grid md:grid-cols-1 gap-3 pl-4">
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span>Modificar o copiar los materiales;</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span>Usar los materiales para cualquier propósito comercial, o para cualquier exhibición pública;</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span>Intentar descompilar o aplicar ingeniería inversa a cualquier software de HermandApp;</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span>Eliminar cualquier derecho de autor u otras notaciones de propiedad;</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span>Transferir los materiales a otra persona o "espejar" los materiales.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">3. Descargo de Responsabilidad</h2>
                        <p>
                            Los materiales en el sitio web de HermandApp se proporcionan "tal cual". HermandApp no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, las garantías implícitas o las condiciones de comerciabilidad.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">4. Limitaciones</h2>
                        <p>
                            En ningún caso HermandApp o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o ganancias) que surjan del uso o la incapacidad de usar los materiales en el sitio web de HermandApp.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">5. Exactitud de los Materiales</h2>
                        <p>
                            Los materiales que aparecen en el sitio web de HermandApp podrían incluir errores técnicos, tipográficos o fotográficos. HermandApp no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">6. Modificaciones</h2>
                        <p>
                            HermandApp puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.
                        </p>
                    </section>

                    <section className="bg-purple-900 text-white p-6 rounded-xl">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">7. Ley Aplicable</h2>
                        <p className="text-purple-100">
                            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de España y usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales en ese estado o ubicación.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-200 text-sm text-center text-gray-500">
                        <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
