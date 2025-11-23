import { CalendarDaysIcon, EnvelopeIcon, MapPinIcon, NewspaperIcon, PhoneIcon, UserCircleIcon, UserGroupIcon, GlobeAltIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Escudo from '../hermandad/assets/escudo.svg'
import Banner from '../hermandad/assets/banner.png'
import React from 'react';

function HermandadPerfil() {

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 pt-8 max-w-7xl"> 

        <header className="relative h-64 rounded-xl overflow-hidden">
          <img src={Banner} alt="Banner de la Hermandad" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black opacity-40"></div>
          
          <div className="relative z-10 flex items-end h-full p-6 text-white">

            <div className="bg-white p-2 rounded-lg mr-4 mb-2">
              <img src={Escudo} alt="Escudo de la Hermandad"  className="w-16 h-16 sm:w-20 sm:h-20"/>
            </div>
              
            <div className='flex flex-col'>
              <h1 className="text-2xl sm:text-4xl font-bold">Hermandad de la Esperanza Macarena</h1>
              <p className="text-sm sm:text-lg">Sevilla - Basílica de la Macarena</p>
            </div>

          </div>
        </header>
      </div>

      <nav className="mt-8 bg-white rounded-xl shadow-md container mx-auto px-6 max-w-7xl">
        <div className="py-3 flex justify-between sm:justify-start gap-1 sm:gap-x-8 text-gray-700 whitespace-nowrap">
          
          <div className="flex items-center space-x-1 sm:space-x-2 border-b-2 border-purple-600 text-purple-600 pb-2 cursor-pointer text-xs sm:text-base">
            <NewspaperIcon className='size-4 sm:size-5'/>
            <span>Historia</span>
          </div>          
          <div className="flex items-center space-x-1 sm:space-x-2 hover:text-purple-600 pb-2 cursor-pointer text-xs sm:text-base">
            <PhotoIcon  className='size-4 sm:size-5'/>
            <span>Galería</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 hover:text-purple-600 pb-2 cursor-pointer text-xs sm:text-base">
            <UserGroupIcon className='size-4 sm:size-5'/>
            <span>Cortejos Procesionales</span>
          </div>
          
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nuestra Historia</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col justify-center">
                <CalendarDaysIcon className='w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-purple-600' />
                <p className="text-gray-500 font-medium text-sm">Año de Fundación</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">1595</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col justify-center">
                <UserCircleIcon className='w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-purple-600' />
                <p className="text-gray-500 font-medium text-sm">N° de Nazarenos</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">3.500</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <MapPinIcon className='w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 text-purple-600' />
                <p className="text-gray-500 font-medium text-sm">Sede Canónica</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">Basílica de la Macarena</p>
              </div>
            </div>
            
            <div className="text-gray-800 leading-relaxed space-y-4 text-base">
              <p>La Hermandad de la Macarena fue fundada en 1595 en el Monasterio de San Basilio por hortelanos. A lo largo de su historia ha residido en diversas sedes, consolidándose como una de las cofradías con mayor devoción popular de Sevilla. Su patrimonio artístico es incalculable, destacando la imagen de María Santísima de la Esperanza Macarena Coronada, anónima del siglo XVII, y Nuestro Padre Jesús de la Sentencia.</p>
              <p>La madrugada del Viernes Santo, la hermandad realiza su estación de penitencia a la Santa Iglesia Catedral, en un recorrido que congrega a miles de fieles y devotos venidos de todas partes del mundo.</p>
            </div>
          </div>
          
          <aside className="lg:w-1/3 space-y-8">
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Contacto y Redes</h3>
              
              <div className="flex flex-wrap items-center space-x-3 mb-3 text-gray-600">
                  <GlobeAltIcon className='w-5 h-5 text-purple-600' />
                  <a href="#" className="hover:text-purple-600 text-sm sm:text-base">hermandaddelamacarena.es</a>
              </div>
              
              <div className="flex flex-wrap items-center space-x-3 mb-3 text-gray-600">
                  <EnvelopeIcon className='w-5 h-5 text-purple-600' />
                  <a href="mailto:secretaria@hermandaddelamacarena.es" className="hover:text-purple-600 text-sm sm:text-base">secretaria@hermandaddelamacarena.es</a>
              </div>
              
              <div className="flex flex-wrap items-center space-x-3 text-gray-600">
                  <PhoneIcon className='w-5 h-5 text-purple-600' />
                  <span className="font-medium text-sm sm:text-base">954 90 18 00</span>
              </div>
            </div>
            
            <div className="bg-purple-700 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">¿Buscas banda?</h3>
              <p className="mb-4 text-sm">Encuentra el acompañamiento musical perfecto para tu hermandad. Explora perfiles, escucha marchas y contacta directamente.</p>
              <button className="flex items-center justify-center w-full py-3 px-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-150 text-sm">
                Contratar Bandas 
              </button>
            </div>
          </aside>
        </div>
      </main>
      
      <div className="container mx-auto px-6 py-8 max-w-7xl"> 
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Galería de Imágenes</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-teal-700 h-64 rounded-lg shadow-md col-span-1"></div> 
          <div className="bg-blue-300 h-64 rounded-lg shadow-md col-span-1"></div> 
          <div className="bg-gray-700 h-64 rounded-lg shadow-md col-span-2 sm:col-span-1"></div> 
          <div className="bg-yellow-200 h-64 rounded-lg shadow-md col-span-1"></div> 
          <div className="bg-blue-200 h-64 rounded-lg shadow-md col-span-1"></div> 
          <div className="bg-gray-800 h-64 rounded-lg shadow-md col-span-2 sm:col-span-1"></div> 
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cortejos Procesionales</h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-600">
            <p className="text-base sm:text-lg font-semibold text-purple-700 mb-1">Paso de Misterio de Nuestro Padre Jesús de la Sentencia</p>
            <p className="text-xs sm:text-sm text-gray-600">Acompañamiento musical: Banda de Cornetas y Tambores de la Centuria Romana Macarena.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-600">
            <p className="text-base sm:text-lg font-semibold text-purple-700 mb-1">Paso de Palio de María Santísima de la Esperanza Macarena</p>
            <p className="text-xs sm:text-sm text-gray-600">Acompañamiento musical: Sociedad Filarmónica Nuestra Señora del Carmen de Salteras.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default HermandadPerfil;