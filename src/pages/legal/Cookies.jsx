export default function Cookies() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 tracking-tight">Política de Cookies</h1>
                <div className="h-1.5 w-32 bg-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-purple-100">
                <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
                    <section className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-purple-900 flex items-center gap-2">
                            1. ¿Qué son las Cookies?
                        </h2>
                        <p className="text-gray-800">
                            Las cookies son pequeños archivos de texto que los sitios web que visita colocan en su ordenador o dispositivo móvil. Se utilizan ampliamente para hacer que los sitios web funcionen, o funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">2. ¿Cómo utilizamos las Cookies?</h2>
                        <p className="mb-4">
                            Utilizamos cookies para entender cómo utiliza nuestro sitio web y mejorar su experiencia. Las cookies pueden ser "persistenes" o de "sesión".
                        </p>
                        <ul className="grid md:grid-cols-1 gap-4">
                            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio web.</span>
                            </li>
                            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando y reportando información de forma anónima.</span>
                            </li>
                            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">•</span>
                                <span><strong>Cookies funcionales:</strong> Permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, idioma o la región en la que se encuentra).</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">3. Gestión de Cookies</h2>
                        <p>
                            La mayoría de los navegadores web le permiten controlar las cookies a través de sus configuraciones de preferencias. Sin embargo, si limita la capacidad de los sitios web para establecer cookies, puede empeorar su experiencia general de usuario.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">4. Cookies de Terceros</h2>
                        <p>
                            En algunos casos, también utilizamos cookies proporcionadas por terceros de confianza. Por ejemplo, este sitio puede utilizar soluciones de análisis como Google Analytics para ayudarnos a mejorar su experiencia.
                        </p>
                    </section>

                    <section className="bg-purple-900 text-white p-6 rounded-xl">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">5. Más Información</h2>
                        <p className="text-purple-100">
                            Esperamos que esto haya aclarado las cosas para usted. Si desea más información, no dude en contactarnos a través de nuestros canales oficiales.
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
