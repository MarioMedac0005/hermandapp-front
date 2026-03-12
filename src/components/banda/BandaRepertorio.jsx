import React from 'react';
import { PlayCircleIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

const BandaRepertorio = ({ songs = [] }) => {
	if (songs.length === 0) {
		return (
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
				<MusicalNoteIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
				<p className="text-gray-500 font-medium">Esta banda aún no ha añadido canciones a su repertorio.</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between px-2">
				<h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
					<span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
					Repertorio Musical
				</h2>
				<span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">
					{songs.length} {songs.length === 1 ? 'Pista' : 'Pistas'}
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{songs.map((song) => {
					const CardWrapper = song.url ? 'a' : 'div';
					const wrapperProps = song.url ? {
						href: song.url,
						target: "_blank",
						rel: "noopener noreferrer",
						title: "Reproducir canción"
					} : {};

					return (
						<CardWrapper
							key={song.id}
							{...wrapperProps}
							className={`flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 group ${song.url ? 'cursor-pointer' : ''}`}
						>
							<div className="flex items-center gap-3 min-w-0">
								<div className="flex-shrink-0 w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
									<MusicalNoteIcon className="h-4 w-4" />
								</div>
								<div className="min-w-0">
									<h3 className="text-sm font-bold text-gray-900 truncate pr-2">
										{song.title}
									</h3>
								</div>
							</div>

							<div className="flex items-center gap-3 ml-2 flex-shrink-0">
								{song.duration && (
									<span className="text-[12px] font-mono font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">
										{song.duration}
									</span>
								)}

								{song.url && (
									<div className="p-1.5 text-gray-300 group-hover:text-purple-500 transition-all">
										<PlayCircleIcon className="h-5 w-5" />
									</div>
								)}
							</div>
						</CardWrapper>
					);
				})}
			</div>
		</div>
	);
};

export default BandaRepertorio;
