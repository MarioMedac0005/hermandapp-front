import { CalendarDaysIcon, EnvelopeIcon, MapPinIcon, NewspaperIcon, PhoneIcon, UserCircleIcon, UserGroupIcon, GlobeAltIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Escudo from '../hermandad/assets/escudo.svg'
import Banner from '../hermandad/assets/banner.png'
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
              
            <div>
              <h1 className="text-4xl font-bold">Hermandad de la Esperanza Macarena</h1>
              <p className="text-lg">Sevilla - Basílica de la Macarena</p>
            </div>
          </div>
        </header>
      </div>

      <nav className="mt-8 bg-white rounded-lg mx-26">
        <div className="container mx-auto px-6 max-w-7xl py-3 flex space-x-8 text-gray-700">
          
          <div className="flex items-center space-x-2 border-b-2 border-purple-600 text-purple-600 pb-2 cursor-pointer">
            <NewspaperIcon className='size-5'/>
            <span>Historia</span>
          </div>          
          <div className="flex items-center space-x-2 hover:text-purple-600 pb-2 cursor-pointer">
            <PhotoIcon  className='size-5'/>
            <span>Repertorio</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-purple-600 pb-2 cursor-pointer">
            <UserGroupIcon className='size-5'/>
            <span>Galeria</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-purple-600 pb-2 cursor-pointer">
            <UserGroupIcon className='size-5'/>
            <span>Disponibilidad</span>
          </div>
        </div>


      </nav>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        
        <div className="flex flex-col space-y-10">
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nuestra Historia</h2>

          <section className="bg-white rounded-xl shadow-lg divide-y divide-gray-100">

            <div className="flex items-start p-4">
              <span className="w-36 font-semibold text-gray-700">Historia</span>
              <p className="flex-1 text-gray-600">Fundada en 1980 en el sevillano barrio del Tiro de Línea, la Agrupación Musical Virgen de los Reyes es hoy una de las formaciones musicales más reconocidas de Andalucía, con un estilo propio que ha marcado una época en la música procesional.</p>
            </div>
            
            <div className="flex items-start p-4">
              <span className="w-36 font-semibold text-gray-700">Dirección Musical</span>
              <p className="flex-1 text-gray-600">Director: D. Antonio Velasco Rodríguez. Subdirector: D. Miguel Ángel Font Morgado.</p>
            </div>
            
            <div className="flex items-start p-4">
              <span className="w-36 font-semibold text-gray-700">Contratos Destacados</span>
              <p className="flex-1 text-gray-600">Semana Santa de Sevilla (Hermandad de Jesús Despojado), Semana Santa de Málaga (Hermandad de la Sentencia), Semana Santa de Córdoba (Hermandad del Rescatado).</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Repertorio Musical</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">La Pasión</p>
                <p className="text-sm text-gray-500">Manuel Alejandro González Cruz</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Gitano de Sevilla</p>
                <p className="text-sm text-gray-500">Paco Lola</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">A la Gloria</p>
                <p className="text-sm text-gray-500">Miguel Ángel Font Morgado</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Consuelo Gitano</p>
                <p className="text-sm text-gray-500">Antonio Velasco Rodríguez</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">Judería Sevillana</p>
                <p className="text-sm text-gray-500">Alejandro Blanco Hernández</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold text-gray-800">La Oración en el Huerto</p>
                <p className="text-sm text-gray-500">Agripino Lozano</p>
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
                    <p className="font-semibold">Actuación en la Semana Santa de Sevilla 2023</p>
                    <p className="text-sm text-gray-300">Hermandad de Jesús Despojado</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="h-64 bg-gray-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                     <span className="text-white text-3xl pl-1">▶</span>
                   </div>
                </div>
                <div className="absolute bottom-0 p-4 text-white">
                    <p className="font-semibold">Concierto de Cuaresma</p>
                    <p className="text-sm text-gray-300">Iglesia del Salvador, Sevilla</p>
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