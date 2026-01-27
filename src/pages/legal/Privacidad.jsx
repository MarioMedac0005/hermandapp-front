export default function Privacidad() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 tracking-tight">Política de Privacidad</h1>
                <div className="h-1.5 w-32 bg-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-purple-100">
                <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
                    <section className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                        <h2 className="text-xl md:text-2xl font-bold mb-3 text-purple-900 flex items-center gap-2">
                            1. Introducción
                        </h2>
                        <p className="text-gray-800">
                            En HermandApp, respetamos su privacidad y nos comprometemos a proteger la información personal que pueda proporcionarnos a través de nuestro sitio web. Esta política explica qué información recopilamos, cómo la usamos y cómo la protegemos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">2. Información que Recopilamos</h2>
                        <p>
                            Podemos recopilar información personal que usted nos proporciona voluntariamente, como nombre, correo electrónico y otros datos de contacto al registrarse o ponerse en contacto con nosotros. Además, recopilamos información técnica automáticamente, como su dirección IP, tipo de navegador y páginas visitadas.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">3. Uso de la Información</h2>
                        <p className="mb-4">
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="grid md:grid-cols-2 gap-3">
                            <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">✓</span>
                                <span>Proporcionar y mantener nuestros servicios</span>
                            </li>
                            <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">✓</span>
                                <span>Mejorar y personalizar el sitio web</span>
                            </li>
                            <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">✓</span>
                                <span>Entender cómo usa nuestro sitio</span>
                            </li>
                            <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-purple-600 mr-2 font-bold">✓</span>
                                <span>Desarrollar nuevos productos y servicios</span>
                            </li>
                            <li className="flex items-center p-3 bg-gray-50 rounded-lg col-span-2">
                                <span className="text-purple-600 mr-2 font-bold">✓</span>
                                <span>Comunicarnos con usted para actualizaciones y soporte</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">4. Compartir Información</h2>
                        <p>
                            No vendemos, comercializamos ni transferimos de otro modo a terceros su información de identificación personal sin su consentimiento, excepto cuando sea necesario para proporcionar nuestros servicios o cumplir con la ley.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">5. Seguridad de los Datos</h2>
                        <p>
                            La seguridad de sus datos es importante para nosotros. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus datos personales, no podemos garantizar su seguridad absoluta, ya que ningún método de transmisión por Internet es 100% seguro.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-800">6. Sus Derechos</h2>
                        <p>
                            Usted tiene derecho a acceder, rectificar o eliminar su información personal. Si desea ejercer alguno de estos derechos, póngase en contacto con nosotros.
                        </p>
                    </section>

                    <section className="bg-purple-900 text-white p-6 rounded-xl">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">7. Cambios a esta Política</h2>
                        <p className="text-purple-100">
                            Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.
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
