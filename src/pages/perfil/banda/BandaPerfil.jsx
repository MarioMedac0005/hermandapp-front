import { EnvelopeIcon, NewspaperIcon, PhoneIcon, GlobeAltIcon, PhotoIcon, CalendarDaysIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import Escudo from '../banda/assets/escudo.png'
import Banner from '../banda/assets/banner.png'
import React from 'react';

function BandaPerfil() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="container mx-auto px-6 pt-8 max-w-7xl"> 

        <header className="relative h-64 rounded-xl overflow-hidden">
          <img src={Banner} alt="Banner de la Hermandad" className="absolute inset-0 w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black opacity-40"></div>
    
          <div className="relative z-10 flex items-end h-full p-6 text-white">

            <div className="bg-white p-2 rounded-lg mr-4 mb-2">
              <img src={Escudo} alt="Escudo de la Hermandad"  className="w-20 h-20"/>
            </div>
              
            <div className='flex flex-col'>
              <h1 className="text-2xl sm:text-4xl font-bold">Banda de Cornetas y Tambores Ntra. Sra. de la Salud</h1>
              <p className="text-lg">Sevilla</p>
              
              <div className="flex justify-start space-x-3 mt-2">
                <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center cursor-pointer">
                  <GlobeAltIcon className='size-5 text-white' />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center cursor-pointer">
                  <EnvelopeIcon className='size-5 text-white' />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center cursor-pointer">
                  <PhoneIcon className='size-5 text-white' />
                </div>
              </div>
          
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
            <MusicalNoteIcon className='size-4 sm:size-5'/>
            <span>Repertorio</span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 hover:text-purple-600 pb-2 cursor-pointer text-xs sm:text-base">
            <PhotoIcon className='size-4 sm:size-5'/>
            <span>Galeria</span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 hover:text-purple-600 pb-2 cursor-pointer text-xs sm:text-base">
            <CalendarDaysIcon className='size-4 sm:size-5'/>
            <span>Disponibilidad</span>
          </div>
          
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col space-y-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nuestra Historia</h2>

          <section className="bg-white rounded-xl shadow-lg divide-y divide-gray-100">
            <div className="flex flex-col md:flex-row items-start p-4">
              <span className="w-full md:w-36 font-semibold text-gray-700 mb-2 md:mb-0">Historia</span>
              <p className="flex-1 text-gray-600">Fundada en 1980 en el barrio de Triana de Sevilla, la Banda de Cornetas y Tambores Ntra. Sra. de la Salud, conocida popularmente como "Tres Caídas de Triana", es una de las formaciones más influyentes del estilo. Su música ha marcado una época en la Semana Santa andaluza.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-start p-4">
              <span className="w-full md:w-36 font-semibold text-gray-700 mb-2 md:mb-0">Dirección Musical</span>
              <p className="flex-1 text-gray-600">Dirección Musical: José M. Toscano y Dirección General: Manuel Escudero.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-start p-4">
              <span className="w-full md:w-36 font-semibold text-gray-700 mb-2 md:mb-0">Contratos Destacados</span>
              <p className="flex-1 text-gray-600">Semana Santa de Sevilla (Hdad. de la Esperanza de Triana), Semana Santa de Málaga (Hdad. de la Sentencia), Semana Santa de Granada (Hdad. de la Santa Cena).</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Repertorio Musical</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">La Fe</p>
                <p className="text-sm text-gray-500">Rafael Vázquez</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Cachorro</p>
                <p className="text-sm text-gray-500">Bienvenido Puelles</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Esperanza</p>
                <p className="text-sm text-gray-500">Israel Jiménez</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Pureza</p>
                <p className="text-sm text-gray-500">Manuel Pérez</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">El Desprecio de Herodes</p>
                <p className="text-sm text-gray-500">Nicolás Turienzo</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Mi Ángel de la Madrugá</p>
                <p className="text-sm text-gray-500">J. M. Toscano</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Galería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="relative">
                <div className="h-64 bg-gray-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl pl-1">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="font-semibold">Salida de la Esperanza de Triana</p>
                  <p className="text-sm text-gray-300">Madrugá 2024</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="h-64 bg-gray-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl pl-1">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="font-semibold">Actuación en la Semana Santa de Málaga</p>
                  <p className="text-sm text-gray-300">Hermandad de la Sentencia</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Disponibilidad</h2>
          </section>

        </div>
      </main>
    </div>
  );
}

export default BandaPerfil;